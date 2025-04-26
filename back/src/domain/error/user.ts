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

class UserDisabled extends DomainError {
  constructor() {
    super(ErrorCode.USER_DISABLED);
  }
}

export { InvalidEmail, InvalidPassword, InvalidUser, UserDisabled };
