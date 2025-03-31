import { Either, fail, success } from "../error/either";
import EmailError from "../error/email";

class Email {
  private constructor(private readonly _email: string) {}

  public static create(email: string): Either<EmailError, Email> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(EmailError.invalidEmail());
    }

    return success(new Email(email));
  }

  public get value(): string {
    return this._email;
  }
}

export default Email;
