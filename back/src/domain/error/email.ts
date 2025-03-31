import DomainError from ".";

class EmailError extends DomainError {
  static invalidEmail(): EmailError {
    return new EmailError("INVALID_EMAIL_FORMAT", "Invalid email format");
  }
}

export default EmailError;
