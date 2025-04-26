import { InvalidEmail } from "../error/user";

class Email {
  private readonly _email: string;

  private constructor(_email: string) {
    this._email = _email;
  }

  public get value(): string {
    return this._email;
  }

  public static create(email: string): Email {
    if (!this.validate(email)) throw new InvalidEmail();
    return new Email(email);
  }

  private static validate(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default Email;
