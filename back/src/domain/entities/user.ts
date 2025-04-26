import { Roles } from "../constants/roles";

import Email from "../value-objects/email";
import Password from "../value-objects/password";

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

  public static create(user: userToCreate): User {
    return new User(
      user.name,
      Email.create(user.email),
      Password.create(user.password),
      user.active,
      user.role,
      user.createdAt,
      user.updatedAt,
    );
  }

  public toJSON() {
    return {
      name: this._name,
      email: this._email,
      password: this._password,
      active: this._active,
      role: this._role,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}

export default User;
