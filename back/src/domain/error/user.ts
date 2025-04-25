import DomainError from ".";
import { ErrorCode } from "./codes";

class UserError extends DomainError {
  static invalidEmail(): UserError {
    return new UserError(ErrorCode.INVALID_EMAIL);
  }

  static tooShort(): UserError {
    return new UserError(ErrorCode.INVALID_PASSWORD);
  }

  static missingUppercase(): UserError {
    return new UserError(ErrorCode.INVALID_PASSWORD);
  }

  static missingNumber(): UserError {
    return new UserError(ErrorCode.INVALID_PASSWORD);
  }
}

export default UserError;
