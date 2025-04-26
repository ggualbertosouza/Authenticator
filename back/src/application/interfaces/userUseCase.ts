import { CreateUserInputDto, UpdateUserInputDto } from "../dto/input/user";
import { UserOutputDto } from "../dto/output/user";

export interface IUserUseCase {
  create(data: CreateUserInputDto): Promise<string>;
  get(token: string): Promise<UserOutputDto>;
  update(token: string, data: UpdateUserInputDto): Promise<UserOutputDto>;
  deactive(token: string): Promise<boolean>;
}
