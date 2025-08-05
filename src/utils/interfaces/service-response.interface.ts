export interface IServiceResponse<T = unknown, E = Error> {
  error: E | null;
  data: T | null;
}
