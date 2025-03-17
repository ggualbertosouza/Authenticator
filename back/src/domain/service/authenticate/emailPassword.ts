import { inject, injectable } from "inversify";

import {
  userCredentialsInvalid,
  userInactive,
  userNotFound,
} from "../../errors/user";
import AuthStrategy from ".";
import TokenManager from "../token";
import PasswordService from "../password";
import UserRepository from "../../../infra/repository/user";
import { AuthResponse } from "../../../application/dto/user";

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

    this.verifyPassword(user.password, credentials.password);

    const accessToken = this.tokenManager.generateAccessToken(user);
    const refreshToken = await this.tokenManager.generateRefreshToken(user._id);

    return { accessToken, refreshToken };
  }

  private async verifyPassword(hashedPassword: string, password: string) {
    const verifyPassword = await this.passwordService.decrypt(
      password,
      hashedPassword
    );
    
    if (!verifyPassword) throw userCredentialsInvalid;
  }
}

export default EmailPasswordStrategy;
