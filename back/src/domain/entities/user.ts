import { Roles } from "../constants/roles";

import Email from "../value-objects/email";
import Password from "../value-objects/password";

import DomainError from "../error";
import { Either, fail, success } from "../error/either";

class User {
  private constructor(
    private readonly _id: string | undefined,
    private readonly _name: string,
    private readonly _email: Email,
    private readonly _password: Password,
    private _role: Roles = Roles.GUEST,
    private _active: boolean = true,
    private readonly _createdAt?: Date,
    private _updatedAt?: Date
  ) {}

  public isActive(): boolean {
    return this._active;
  }

  public static create(input: {
    name: string;
    email: string;
    password: string;
    role?: Roles;
    active?: boolean;
  }): Either<DomainError, User> {
    const { name, email, password, role, active } = input;

    const emailResult = Email.create(email);
    if (emailResult.isLeft()) return fail(emailResult.value);

    const passwordResult = Password.create(password);
    if (passwordResult.isLeft()) return fail(passwordResult.value);

    return success(
      new User(
        undefined,
        name,
        emailResult.value,
        passwordResult.value,
        role,
        active
      )
    );
  }

  public toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      active: this._active,
      role: this._role,
    };
  }
}

export default User;
