import { inject } from "inversify";

import { UserOutputDto } from "../dto/output/user";
import { CreateUserInputDto } from "../dto/input/user";

import DomainError from "../../domain/error";
import User from "../../domain/entities/user";
import { Roles } from "../../domain/constants/roles";
import { IUserRepository } from "../../domain/repositories/user";

import UserRepository from "../../infra/repositories/user";
import { Injectable } from "../../presentation/https/utils/inversify";
import PasswordService from "../../infra/services/password";
import { IPasswordService } from "../../domain/service/password";

@Injectable({ key: UserUseCase })
class UserUseCase {
  private userRepository: IUserRepository;
  private passwordService: IPasswordService;

  constructor(
    @inject(UserRepository) userRepository: IUserRepository,
    @inject(PasswordService) passwordService: IPasswordService,
  ) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
  }

  public async create(
    data: CreateUserInputDto,
  ): Promise<UserOutputDto | DomainError> {
    const { email, name, password } = data;

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    // #TODO Tratar o erro corretamente
    if (userAlreadyExists) throw new Error();

    const hashedPassword = await this.passwordService.encrypt(password);
    if (!hashedPassword) throw new Error();

    const userObject = User.create({
      name,
      email,
      password: hashedPassword,
      active: true,
      role: Roles.Reader,
    });
    if (userObject.isLeft()) throw new Error();

    const user = userObject.value;
    const savedUser = await this.userRepository.create(user);

    // Como devo validar os dados que devem ser retornados para usuário na camada de domínio?
    return UserOutputDto.fromUser(user.toJSON());
  }

  public async update() {}
}

export default UserUseCase;
