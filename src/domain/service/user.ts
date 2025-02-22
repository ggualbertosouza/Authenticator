import mongoose from "mongoose";
import { inject, injectable } from "inversify";

import UserRepository from "../../infra/repository/user";
import {
  UserAlreadyExist,
  userInactive,
  userNotFound,
  userCredentialsInvalid,
} from "../errors/user";
import { UserRequest } from "../../application/dto/user";
import PasswordService from "./password";

@injectable()
class UserService {
  private userRepository: UserRepository;
  private passwordService: PasswordService;

  constructor(
    @inject(UserRepository) userRepository: UserRepository,
    @inject(PasswordService) passwordService: PasswordService
  ) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
  }

  public async createUser(user: UserRequest): Promise<any> {
    const userExist = await this.userRepository.findUserByEmail(user.email);
    if (userExist) throw UserAlreadyExist;

    const hashedPassword = await this.passwordService.encrypt(user.password);

    const userAuthenticated = await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    return userAuthenticated;
  }

  public async findUser(id: mongoose.Types.ObjectId) {
    const user = await this.userRepository.findUser(id);

    if (!user) throw userNotFound;
    if (!user.active) throw userInactive;

    return user;
  }

  public async editUser(userData: UserRequest) {
    const userExist = await this.userRepository.findUserByEmail(userData.email);
    if (!userExist) throw userNotFound;

    return await this.userRepository.editUser(userData);
  }

  public async removeUser(id: mongoose.Types.ObjectId) {
    const deleted = await this.userRepository.removeUser(id);
    if (!deleted) throw userNotFound;

    return { deleted: true };
  }
}

export default UserService;
