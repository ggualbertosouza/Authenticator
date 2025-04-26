import { InvalidEmail } from "../error/user";

class Email {
  private readonly _email: string;

  private constructor(_email: string) {
    this._email = _email;
  }

  public static create(email: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new InvalidEmail();

    return new Email(email);
  }

  public get value(): string {
    return this._email;
  }
}

export default Email;
