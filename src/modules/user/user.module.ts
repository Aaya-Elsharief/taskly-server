import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_COLLECTION_NAME, UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/repository';
import { IsValidMobileConstraint } from './custom-validation-rules/mobile-number.validator';
import { MobileIsExistConstraint } from './custom-validation-rules/mobile-number-exist.validator';
import { PasswordStrengthConstraint } from './custom-validation-rules/password-strength.validator';
import { EmailIsExistConstraint } from './custom-validation-rules/email-exist.validator';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth/strategies/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_COLLECTION_NAME,
        schema: UserSchema,
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
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    IsValidMobileConstraint,
    MobileIsExistConstraint,
    PasswordStrengthConstraint,
    EmailIsExistConstraint,
    LocalStrategy,
  ],
  exports: [UserService],
})
export class UserModule {}
