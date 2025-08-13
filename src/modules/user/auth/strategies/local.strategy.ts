import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ErrorCodes } from 'src/utils/constants/error-codes';
import { UnAuthorizedException } from 'src/utils/exception/un-authorized-exception';
import { User } from '../../schema/user.schema';
import { UserService } from '../../service/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnAuthorizedException(ErrorCodes.UNAUTHORIZED);
    }
    if (!user.isVerified) {
      throw new UnAuthorizedException(ErrorCodes.USER_NOT_VERIFIED);
    }
    return user;
  }
}
