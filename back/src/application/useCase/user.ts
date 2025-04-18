import { inject } from "inversify";
import { BINDINGSCOPE } from "../../@types/inverisfy";
import { IUserRepository } from "../../domain/repositories/user";
import { Injectable } from "../../presentation/https/utils/inversify";
import { CreateUserInputDto } from "../dto/input/user";
import { UserOutputDto } from "../dto/output/user";
import UserRepository from "../../infra/repositories/user";
import User from "../../domain/entities/user";
import DomainError from "../../domain/error";
import { Roles } from "../../domain/constants/roles";

@Injectable({
  key: UserUseCase,
  scope: BINDINGSCOPE.SINGLETON,
})
class UserUseCase {
  private userRepository: IUserRepository;
  constructor(@inject(UserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async create(
    data: CreateUserInputDto,
  ): Promise<UserOutputDto | DomainError> {
    const { email, name, password } = data;

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    // #TODO tratar erro
    if (userAlreadyExists) throw new Error();

    const userObject = User.create({
      email,
      name,
      password,
      active: true,
      role: Roles.Reader,
    });
    if (userObject.isLeft()) throw new Error();

    const user = userObject.value;

    // 1 - Criar hash da senha
    const hashedPassword = password;
    // 2 - Definir valores padrões: Role, active
    // Orquestrar
    // 1 - Chamar repository
    // 2 - Enviar email de confirmação

    // #TODO tratar erro

    return new UserOutputDto(userObject.value);
  }
}

export default UserUseCase;
