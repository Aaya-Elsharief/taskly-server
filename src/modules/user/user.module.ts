import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { USER_COLLECTION_NAME, UserSchema } from './schema/user.schema';
import { Connection } from 'mongoose';
import { UserRepository } from './repository/repository';
import { IsValidMobileConstraint } from './custom-validation-rules/mobile-number.validator';
import { MobileIsExistConstraint } from './custom-validation-rules/mobile-number-exist.validator';
import { PasswordStrengthConstraint } from './custom-validation-rules/password-strngth.validator';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: USER_COLLECTION_NAME,
        useFactory: async (nativeMongooseConnection: Connection) => {
          const schema = UserSchema;
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    IsValidMobileConstraint,
    MobileIsExistConstraint,
    PasswordStrengthConstraint,
  ],
  exports: [UserService],
})
export class UserModule {}
