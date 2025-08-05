import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseModel } from './response';

@Injectable()
export class SuccessResponse<T = unknown> extends ResponseModel<T> {
  constructor(data?: T) {
    super(HttpStatus.OK, true, null, data, null);
  }
}
