import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseModel } from './response';
import { ResponseErrors } from './constants';

@Injectable()
export class BadRequestResponse extends ResponseModel<any> {
  constructor(feedback?: any) {
    super(
      HttpStatus.BAD_REQUEST,
      false,
      ResponseErrors.BAD_REQUEST,
      null,
      feedback,
    );
  }
}
