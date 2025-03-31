import HttpError from "./httpErrors";

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}

export class NotFound extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}
