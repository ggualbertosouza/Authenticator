import { InvalidPassword } from "../error/user";

class Password {
  private constructor(private readonly _password: string) {}

  public static create(password: string, isHashed: boolean = false): Password {
    if (isHashed) return new Password(password);

    if (password.length < 8) throw new InvalidPassword();
    if (!/[0-9]/.test(password)) throw new InvalidPassword();
    if (!/[A-Z]/.test(password)) throw new InvalidPassword();

    return new Password(password);
  }

  public get value(): string {
    return this._password;
  }
}

export default Password;
