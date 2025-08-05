import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorResponse } from '../responses/error-response';
import { ResponseStatus } from '../responses/constants';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    try {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;

      const ctx = host.switchToHttp();

      let httpStatus: number;
      let errorResponse: string;
      let feedback: any = null;

      // Handle specific exception types
      if (exception instanceof NotFoundException) {
        httpStatus = HttpStatus.NOT_FOUND;
        errorResponse = ResponseStatus.NOT_FOUND;
        feedback = exception.getResponse();
      } else if (exception instanceof BadRequestException) {
        httpStatus = HttpStatus.BAD_REQUEST;
        errorResponse = ResponseStatus.BAD_REQUEST;
        feedback = exception.getResponse();
      } else if (exception instanceof UnauthorizedException) {
        httpStatus = HttpStatus.UNAUTHORIZED;
        errorResponse = ResponseStatus.UNAUTHORIZED;
        feedback = exception.getResponse();
      } else if (exception instanceof ForbiddenException) {
        httpStatus = HttpStatus.FORBIDDEN;
        errorResponse = ResponseStatus.FORBIDDEN;
        feedback = exception.getResponse();
      } else if (exception instanceof HttpException) {
        httpStatus = exception.getStatus();
        errorResponse = this.getErrorResponseByStatus(httpStatus);
        feedback = exception.getResponse();
      } else {
        // Log unexpected errors
        console.error('Unexpected error:', exception);
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        errorResponse = ResponseStatus.INTERNAL_SERVER_ERROR;
        feedback = 'Internal server error';
      }

      const myRes = new ErrorResponse(httpStatus, errorResponse, feedback);
      httpAdapter.reply(
        ctx.getResponse(),
        myRes.getResponseObject(),
        httpStatus,
      );
    } catch (filterError) {
      console.error('Error in exception filter:', filterError);
      // Fallback response
      const { httpAdapter } = this.httpAdapterHost;
      const ctx = host.switchToHttp();
      const fallbackResponse = new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseStatus.INTERNAL_SERVER_ERROR,
        'An unexpected error occurred',
      );
      httpAdapter.reply(
        ctx.getResponse(),
        fallbackResponse.getResponseObject(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getErrorResponseByStatus(status: number): string {
    switch (status) {
      case HttpStatus.NOT_FOUND:
        return ResponseStatus.NOT_FOUND;
      case HttpStatus.BAD_REQUEST:
        return ResponseStatus.BAD_REQUEST;
      case HttpStatus.UNAUTHORIZED:
        return ResponseStatus.UNAUTHORIZED;
      case HttpStatus.FORBIDDEN:
        return ResponseStatus.FORBIDDEN;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return ResponseStatus.UNPROCESSABLE_ENTITY;
      case HttpStatus.TOO_MANY_REQUESTS:
        return ResponseStatus.TOO_MANY_REQUESTS;
      default:
        return ResponseStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
