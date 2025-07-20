import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariables } from 'env/env.configuration';
import { AllExceptionsFilter } from './utils/exception-filter/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  const config = new DocumentBuilder()
    .setTitle('Taskly API')
    .setDescription('The API documentation for Taskly application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(EnvironmentVariables().port);
}
bootstrap();
