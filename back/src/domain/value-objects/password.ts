import bcrypt from "bcrypt";

import PasswordError from "../error/password";
import { Either, success, fail } from "../error/either";

class Password {
  private constructor(private readonly _password: string) {}

  public static create(
    password: string,
    isHashed: boolean = false,
  ): Either<PasswordError, Password> {
    if (isHashed) return success(new Password(password));

    if (password.length < 8) {
      return fail(PasswordError.tooShort(8));
    }

    if (!/[A-Z]/.test(password)) {
      return fail(PasswordError.missingUppercase());
    }

    if (!/[0-9]/.test(password)) {
      return fail(PasswordError.missingNumber());
    }

    return success(new Password(password));
  }

  // #TODO Retirar bcrypt da camada de domain
  public async compare(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this._password);
  }

  public get value(): string {
    return this._password;
  }
}

export default Password;
