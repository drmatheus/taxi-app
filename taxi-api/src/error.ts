export class AppError extends Error {
  error_code: string;
  error_description: string;
  statusCode: number;

  constructor(
    error_code: string,
    error_description: string,
    statusCodes: number = 400
  ) {
    super();
    this.error_description = error_description;
    this.error_code = error_code;
    this.statusCode = statusCodes;
  }
}
