import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'env/env.configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './modules/token/token.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: [EnvironmentVariables],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongodb.connectionUrl'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
