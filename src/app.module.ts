import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentVariables } from 'env/env.configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [EnvironmentVariables],
    }),
    MongooseModule.forRoot(EnvironmentVariables().mongodb.connectionUrl),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
