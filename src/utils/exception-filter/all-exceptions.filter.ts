import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

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
    console.log('httpStatus: ', httpStatus);

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    let myRes = null;

    switch (httpStatus) {
      case HttpStatus.NOT_FOUND:
        console.log(HttpStatus.NOT_FOUND);
        if (exception instanceof HttpException) {
          myRes = new NotFoundException(exception.getResponse());
        } else {
          myRes = new NotFoundException();
        }
        httpAdapter.reply(ctx.getResponse(), myRes.response, httpStatus);
        break;

      default:
        if (exception instanceof HttpException) {
          myRes = new InternalServerErrorException(exception.getResponse());
        } else {
          myRes = new InternalServerErrorException();
        }
        httpAdapter.reply(ctx.getResponse(), myRes.response, httpStatus);
        break;
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
