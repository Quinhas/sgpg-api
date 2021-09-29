export default class HttpException extends Error {
  statusCode?: number;
  status?: number;
  message: string;

  constructor(statusCode: number, message: string, error?: string) {
    super();

    this.statusCode = statusCode;
    this.message = message;
  }
}
