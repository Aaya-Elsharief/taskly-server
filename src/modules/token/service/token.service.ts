import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../repository/token.repository';
import { JwtService } from '@nestjs/jwt';
import { SourceEnum } from '../constants/token.enum';
import { ConfigService } from '@nestjs/config';
import { TokenTypes } from '../constants/token-types.enum';
import { CreateTokenInterface } from '../interfaces/token-payload.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createTokens(payload: CreateTokenInterface): Promise<any> {
    const enableMax = this.getMaxTokenConfig(payload.deviceSource, 'enableMax');
    const tokens = this.generateTokens(payload);

    if (enableMax) {
      const max = this.getMaxTokenConfig(payload.deviceSource, 'max');
      const userTokensCount = await this.tokenRepository.findAndCount({
        userId: payload.userId,
        deviceSource: payload.deviceSource,
      });

      if (userTokensCount >= max) {
        const [oldestToken] = await this.tokenRepository.findOneAggregate([
          {
            $match: {
              userId: payload.userId,
              deviceSource: payload.deviceSource,
            },
          },
          { $sort: { updatedAt: 1 } },
          { $limit: 1 },
        ]);

        await this.tokenRepository.findOneAndUpdate(
          { _id: oldestToken._id },
          {
            refreshToken: tokens.refreshToken,
            deviceSource: payload.deviceSource,
            expiresAt: this.getTokenExpiry(),
          },
        );
        return tokens;
      }
    }

    await this.tokenRepository.create({
      refreshToken: tokens.refreshToken,
      userId: payload.userId,
      deviceSource: payload.deviceSource,
      expiresAt: this.getTokenExpiry(),
    });

    return tokens;
  }

  private getMaxTokenConfig(source: SourceEnum, type: 'enableMax' | 'max') {
    const prefix = source === SourceEnum.WEB ? 'web' : 'mobile';
    return this.configService.get(
      `tokens.${prefix}${type === 'enableMax' ? 'EnableMax' : 'Max'}`,
    );
  }

  private getTokenExpiry(): Date {
    return new Date(
      Date.now() + this.configService.get('tokens.refreshTokenExpiryInMs'),
    );
  }

  private generateTokens(payload: any) {
    const tokenPayload = {
      id: payload.userId,
      tokenType: TokenTypes.UserJwtToken,
    };

    const refreshTokenPayload = {
      id: payload.userId,
      tokenType: TokenTypes.UserJwtRefreshToken,
    };

    return {
      accessToken: this.jwtService.sign(tokenPayload, {
        expiresIn: this.configService.get('tokens.accessTokenExpiryInMs'),
      }),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        expiresIn: this.configService.get('tokens.refreshTokenExpiryInMs'),
      }),
    };
  }
}
