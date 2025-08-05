export interface IResponseModel<T> {
  statusCode: number;
  status: boolean;
  error: string;
  data: T; // Main response payload
  feedback: T; // Additional metadata or user feedback
}

export class ResponseModel<T> implements IResponseModel<T> {
  statusCode: number;
  status: boolean;
  error: string;
  data: T;
  feedback: T;

  constructor(
    statusCode: number,
    status: boolean,
    error = '',
    data: T = {} as T,
    feedback: T = {} as T,
  ) {
    this.statusCode = statusCode;
    this.status = status;
    this.error = error;
    this.data = data;
    this.feedback = feedback;
  }

  getResponseObject() {
    return { ...this };
  }
}
