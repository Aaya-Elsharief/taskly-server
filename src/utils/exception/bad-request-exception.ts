import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(feedback?: any) {
    // let myRes = new BadRequestResponse(feedback);
    super(feedback, HttpStatus.BAD_REQUEST);
  }
}
