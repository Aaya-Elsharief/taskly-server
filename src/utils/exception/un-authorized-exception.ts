import { HttpException, HttpStatus } from '@nestjs/common';

export class UnAuthorizedException extends HttpException {
  constructor(feedback?: any) {
    super(feedback, HttpStatus.UNAUTHORIZED);
  }
}
