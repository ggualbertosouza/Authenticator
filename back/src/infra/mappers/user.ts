import { CreateUserInputDto } from "../../application/dto/input/user";
import { UserOutputDto } from "../../application/dto/output/user";
import { Roles } from "../../domain/constants/roles";
import { User } from "../../domain/entities/user";

class UserMapper {
  static toDomain(input: CreateUserInputDto): User {
    return {
      name: input.name,
      email: input.email,
      password: input.password,
      role: Roles.Reader,
      active: true,
    };
  }

  static toOutput(user: User): UserOutputDto {
    return new UserOutputDto(user.id!, user.name, user.email, user.createdAt);
  }
}

export default UserMapper;
