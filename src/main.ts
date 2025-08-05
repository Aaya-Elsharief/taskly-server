import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { EnvironmentVariables } from 'env/env.configuration';
import { AllExceptionsFilter } from './utils/exception-filter/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorCodes } from './utils/constants/error-codes';
import { ValidationErrorCodes } from './utils/constants/validation-error-codes';
import { InvalidParamsException } from './utils/exception/invalid-params-exception';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return ValidationErrorsFormat(errors);
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

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
function ValidationErrorsFormat(
  validationErrors: ValidationError[],
): InvalidParamsException {
  console.log('ValidationErrors', validationErrors);

  const myValidationErrors: { [key: string]: any } = {};

  // Recursion using inner function to handle nested objects
  function _ValidationErrorsFormat(validationErrors, property?: string) {
    for (const validationError of validationErrors) {
      if (
        validationError.children != undefined &&
        validationError.children.length > 0
      ) {
        _ValidationErrorsFormat(
          validationError.children,
          validationError.property,
        );
      } else {
        const key =
          property != undefined && property.length > 0
            ? property + '.' + validationError.property
            : validationError.property;
        myValidationErrors[key] = [];
        const constraints = Object.keys(validationError.constraints);
        for (const constraint of constraints) {
          myValidationErrors[key].push(ValidationErrorCodes[constraint]);
        }
      }
    }
  }

  _ValidationErrorsFormat(validationErrors);

  // return exception
  const invalidParams = ErrorCodes.INVALID_PARAMS;
  invalidParams.fields = myValidationErrors;
  return new InvalidParamsException(invalidParams);
}
