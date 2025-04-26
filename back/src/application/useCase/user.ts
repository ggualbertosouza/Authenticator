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
import { InvalidUser } from "../../domain/error/user";

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
    if (userAlreadyExists) throw new InvalidUser();

    const hashedPassword = await this.passwordService.encrypt(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      active: true,
      role: Roles.Reader,
    });

    const savedUser = await this.userRepository.create(user.toJSON());
    if (!savedUser) throw new Error();

    return UserOutputDto.fromUser(user);
  }

  public async update() {}
}

export default UserUseCase;
