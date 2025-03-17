export class ApiError extends Error {
  public message: string;
  public status?: number;
  public data?: any;
  public name: string;

  constructor(message: string, status?: number, data?: any) {
    super(message);

    this.message = message;
    this.status = status;
    this.data = data;

    this.name = "Api Error";
  }
}
