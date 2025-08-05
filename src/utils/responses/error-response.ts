import { Injectable } from '@nestjs/common';
import { ResponseModel } from './response';

@Injectable()
export class ErrorResponse<T = unknown> extends ResponseModel<T> {
  constructor(statusCode: number, error: string, feedback?: T) {
    super(statusCode, false, error, null, feedback);
  }
}
