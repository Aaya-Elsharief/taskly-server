import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../constants/error-codes';

export class InternalServerErrorException extends HttpException {
  constructor(feedback?: any) {
    // let myRes = new InternalServerErrorResponse(feedback);
    super(
      feedback || ErrorCodes.UNEXPECTED_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
