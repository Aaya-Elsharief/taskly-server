import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { USER_COLLECTION_NAME, UserSchema } from './schema/user.schema';
import { Connection } from 'mongoose';
import { UserRepository } from './repository/repository';

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
  providers: [UserService, UserRepository],
})
export class UserModule {}
