import { Roles } from "../../../domain/constants/roles";
import { UserJSON } from "../../../domain/entities/types";

class UserOutputDto {
  private constructor(
    id: string,
    name: string,
    email: string,
    active: boolean,
    role: Roles,
    createdAt?: Date,
    updatedAt?: Date,
  ) {}

  static fromUser(user: UserJSON, id: string) {
    return new UserOutputDto(
      id,
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
