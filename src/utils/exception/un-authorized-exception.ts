import { HttpException, HttpStatus } from '@nestjs/common';

export class UnAuthorizedException extends HttpException {
  constructor(feedback?: any) {
    // let myRes = new UnAuthorizedResponse(feedback);
    super(feedback, HttpStatus.UNAUTHORIZED);
  }
}
