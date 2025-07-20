import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResponse } from '../responses/error-response';
import { ResponseErrors } from '../responses/constants';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let myRes = null;

    switch (httpStatus) {
      case HttpStatus.NOT_FOUND:
        myRes = new ErrorResponse(
          HttpStatus.NOT_FOUND,
          ResponseErrors.NOT_FOUND,
          exception instanceof HttpException ? exception.getResponse() : null,
        );
        break;

      case HttpStatus.BAD_REQUEST:
        myRes = new ErrorResponse(
          HttpStatus.BAD_REQUEST,
          ResponseErrors.BAD_REQUEST,
          exception instanceof HttpException ? exception.getResponse() : null,
        );
        break;

      case HttpStatus.UNAUTHORIZED:
        myRes = new ErrorResponse(
          HttpStatus.UNAUTHORIZED,
          ResponseErrors.UNAUTHORIZED,
          exception instanceof HttpException ? exception.getResponse() : null,
        );
        break;

      case HttpStatus.FORBIDDEN:
        myRes = new ErrorResponse(
          HttpStatus.FORBIDDEN,
          ResponseErrors.FORBIDDEN,
          exception instanceof HttpException ? exception.getResponse() : null,
        );
        break;

      default:
        myRes = new ErrorResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          ResponseErrors.INTERNAL_SERVER_ERROR,
          exception instanceof HttpException ? exception.getResponse() : null,
        );
    }
    httpAdapter.reply(ctx.getResponse(), myRes.getResponseObject(), httpStatus);
  }
}
