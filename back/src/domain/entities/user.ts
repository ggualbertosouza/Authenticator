import { Roles } from "../constants/roles";

import Email from "../value-objects/email";
import Password from "../value-objects/password";

import DomainError from "../error";
import { Either, fail, success } from "../error/either";

type userToCreate = {
  name: string;
  email: string;
  password: string;
  role?: Roles;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

class User {
  private readonly _name: string;
  private readonly _email: Email;
  private readonly _password: Password;
  private readonly _role: Roles;
  private readonly _active: boolean;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  private constructor(
    name: string,
    email: Email,
    password: Password,
    active?: boolean,
    role?: Roles,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this._name = name;
    this._email = email;
    this._password = password;
    this._active = active || true;
    this._role = role || Roles.Reader;
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || new Date();
  }

  public isActive(): boolean {
    return this._active;
  }

  public static create(user: userToCreate): Either<DomainError, User> {
    const emailResult = Email.create(user.email);
    if (emailResult.isLeft()) return fail(emailResult.value);

    const passwordResult = Password.create(user.password);
    if (passwordResult.isLeft()) return fail(passwordResult.value);

    return success(
      new User(
        user.name,
        emailResult.value,
        passwordResult.value,
        user.active,
        user.role,
        user.createdAt,
        user.updatedAt,
      ),
    );
  }

  public toJSON() {
    return {
      name: this._name,
      email: this._email.value,
      active: this._active,
      role: this._role,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}

export default User;
