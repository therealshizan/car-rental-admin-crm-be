export interface IResponseGenerators<Data> {
  data: Data;
  status_code: number;
  status_message: string;
  response_error: boolean;
}
