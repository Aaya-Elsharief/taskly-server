import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(feedback?: any) {
    // let myRes = new NotFoundResponse(feedback);
    super(feedback, HttpStatus.NOT_FOUND);
  }
}
