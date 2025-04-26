import DomainError from ".";
import { ErrorCode } from "./codes";

class InvalidEmail extends DomainError {
  constructor() {
    super(ErrorCode.INVALID_EMAIL);
  }
}

class InvalidPassword extends DomainError {
  constructor() {
    super(ErrorCode.INVALID_PASSWORD);
  }
}

class InvalidUser extends DomainError {
  constructor() {
    super(ErrorCode.INVALID_USER);
  }
}

export { InvalidEmail, InvalidPassword, InvalidUser };
