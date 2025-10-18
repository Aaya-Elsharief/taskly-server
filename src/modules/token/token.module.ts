import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from './controller/token.controller';
import { TokenService } from './service/token.service';
import { TokenRepository } from './repository/token.repository';
import { TOKEN_COLLECTION_NAME, TokenSchema } from './schema/token.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TOKEN_COLLECTION_NAME,
        schema: TokenSchema,
      },
    ]),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiresIn'),
          algorithm: configService.get('jwt.algorithm'),
        },
      }),
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
