import { Either, fail, success } from "../error/either";
import UserError from "../error/user";

class Email {
  private readonly _email: string;

  private constructor(_email: string) {
    this._email = _email;
  }

  public static create(email: string): Either<UserError, Email> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(UserError.invalidEmail());
    }

    return success(new Email(email));
  }

  public get value(): string {
    return this._email;
  }
}

export default Email;
