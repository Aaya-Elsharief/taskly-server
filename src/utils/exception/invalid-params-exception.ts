import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidParamsException extends HttpException {
  constructor(feedback?: any) {
    // let myRes = new BadRequestResponse(feedback);
    super(feedback, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
