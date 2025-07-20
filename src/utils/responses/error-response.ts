import { Injectable } from '@nestjs/common';
import { ResponseModel } from './response';

@Injectable()
export class ErrorResponse extends ResponseModel<any> {
  constructor(statusCode: number, error: string, feedback?: any) {
    super(statusCode, false, error, null, feedback);
  }
}
