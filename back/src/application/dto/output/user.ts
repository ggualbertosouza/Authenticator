import { Roles } from "../../../domain/constants/roles";
import User from "../../../domain/entities/user";

class UserOutputDto {
  private constructor(
    id: string | undefined,
    name: string,
    email: string,
    active: boolean,
    role: Roles,
    createdAt?: Date,
    updatedAt?: Date,
  ) {}

  static fromUser(user: {
    id: string | undefined;
    name: string;
    email: string;
    active: boolean;
    role: Roles;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new UserOutputDto(
      user.id,
      user.name,
      user.email,
      user.active,
      user.role,
      user.createdAt,
      user.updatedAt,
    );
  }
}

export { UserOutputDto };
