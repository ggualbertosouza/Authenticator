import { inject, injectable } from "inversify";

import AuthStrategy from ".";
import { AuthResponse } from "../../../application/dto/user";
import UserRepository from "../../../infra/repository/user";
import PasswordService from "../password";
import {
  userCredentialsInvalid,
  userInactive,
  userNotFound,
} from "../../errors/user";
import TokenManager from "../token";
import { User } from "../../../infra/models/user";
import mongoose, { Document } from "mongoose";

type userCredentials = {
  email: string;
  password: string;
};

@injectable()
class EmailPasswordStrategy extends AuthStrategy {
  private userRepository: UserRepository;
  private passwordService: PasswordService;
  private tokenManager: TokenManager;

  constructor(
    @inject(UserRepository) userRepository: UserRepository,
    @inject(PasswordService) passwordService: PasswordService,
    @inject(TokenManager) tokenManager: TokenManager
  ) {
    super();
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.tokenManager = tokenManager;
  }

  protected async authenticateUser(
    credentials: userCredentials
  ): Promise<AuthResponse> {
    const user = await this.userRepository.findUserByEmail(credentials.email);
    if (!user) throw userNotFound;
    if (!user.active) throw userInactive;

    const verifyPassword = await this.passwordService.decrypt(
      credentials.password,
      user.password
    );
    if (!verifyPassword) throw userCredentialsInvalid;

    const accessToken = this.tokenManager.generateAccessToken(user);
    const refreshToken = await this.tokenManager.generateRefreshToken(user._id);

    return this.formatResponse(user, accessToken, refreshToken);
  }

  private formatResponse(
    user: User & { _id: mongoose.Types.ObjectId },
    accessToken: string,
    refreshToken: string
  ) {
    const { _id, name, email, role } = user;

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: String(_id),
          name,
          email,
          role,
        },
      },
    };
  }
}

export default EmailPasswordStrategy;
