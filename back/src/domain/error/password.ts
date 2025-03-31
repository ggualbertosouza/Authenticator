import DomainError from ".";

class PasswordError extends DomainError {
  static tooShort(minLength: number): PasswordError {
    return new PasswordError(
      "PASSWORD_TOO_SHORT",
      `Password must have at least ${minLength} character`
    );
  }

  static missingUppercase(): PasswordError {
    return new PasswordError(
      "PASSWORD_MISSING_UPPERCASE",
      "Password must have at least one uppercase character"
    );
  }

  static missingNumber(): PasswordError {
    return new PasswordError(
      "PASSWORD_MISSING_NUMBER",
      "Password must have at least one number"
    );
  }
}

export default PasswordError;
