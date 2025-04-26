import { inject } from "inversify";
import { Injectable } from "../../presentation/https/utils/inversify";

import { UserOutputDto } from "../dto/output/user";
import { CreateUserInputDto, UpdateUserInputDto } from "../dto/input/user";

import { Roles } from "../../domain/constants/roles";

import User from "../../domain/entities/user";
import { InvalidUser, UserDisabled } from "../../domain/error/user";
import UserRepository from "../../infra/repositories/user";
import { IUserRepository } from "../../domain/repositories/user";

import PasswordService from "../../infra/services/password";
import { IPasswordService } from "../../domain/service/password";
import { IUserUseCase } from "../interfaces/userUseCase";
import { ISessionService } from "../../domain/service/session";
import { Session } from "../../domain/types/session";
import SessionService from "../../infra/services/session";

@Injectable({ key: UserUseCase })
class UserUseCase implements IUserUseCase {
  private userRepository: IUserRepository;
  private passwordService: IPasswordService;
  private sessionService: ISessionService;

  constructor(
    @inject(UserRepository) userRepository: IUserRepository,
    @inject(PasswordService) passwordService: IPasswordService,
    @inject(SessionService) sessionService: ISessionService,
  ) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.sessionService = sessionService;
  }

  public async create(data: CreateUserInputDto): Promise<UserOutputDto> {
    const { email, name, password } = data;

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) throw new InvalidUser();

    const hashedPassword = await this.passwordService.encrypt(password);
    const id = this.userRepository.createId();

    const user = User.create({
      id,
      name,
      email,
      password: hashedPassword,
      active: true,
      role: Roles.Reader,
    });

    const savedUser = await this.userRepository.create(user.toJSON());
    if (!savedUser) throw new Error();

    return await this.sessionService.create(id);
  }

  public async get(token: string): Promise<UserOutputDto> {
    const { userId } = await this.sessionService.get(token);
    const user = await this.getUser(userId);

    return UserOutputDto.fromEntity(user);
  }

  public async update(
    token: string,
    data: UpdateUserInputDto,
  ): Promise<UserOutputDto> {
    const { userId } = await this.sessionService.get(token);
    const user = await this.getUser(userId);

    const userUpdated = await this.userRepository.update(user.id, data);
    if (!userUpdated) throw new InvalidUser();

    return UserOutputDto.fromEntity(userUpdated);
  }

  public async deactive(token: string): Promise<boolean> {
    const { userId } = await this.sessionService.get(token);
    const user = await this.getUser(userId);

    const isDeleted = await this.userRepository.delete(user.id);
    if (!isDeleted) throw new InvalidUser();

    return isDeleted;
  }

  private async getUser(userId: string) {
    const id = this.userRepository.createId(userId);

    const user = await this.userRepository.findById(id);
    if (!user) throw new InvalidUser();
    if (!user.active) throw new UserDisabled();

    return user;
  }
}

export default UserUseCase;
