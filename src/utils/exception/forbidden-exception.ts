import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(feedback?: any) {
    // let myRes = new ForbiddenResponse(feedback);
    super(feedback, HttpStatus.FORBIDDEN);
  }
}
