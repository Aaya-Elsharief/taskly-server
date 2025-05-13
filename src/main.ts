import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariables } from 'env/env.configuration';
import { AllExceptionsFilter } from './utils/exception-filter/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  await app.listen(EnvironmentVariables().port);
}
bootstrap();
