import { inject } from "inversify";

import AuthStrategy from ".";
import TokenManager from "../token";

import { AuthResponse } from "../../../application/dto/user";

import AzureAuthProvider from "../../../infra/provider/auth/azure";
import UserRepository from "../../../infra/repositories/user";

import { userInactive, userNotFound } from "../../../infra/error/index";

class AzureAuthService extends AuthStrategy {
  private azureAuthProvider: AzureAuthProvider;
  private userRepository: UserRepository;
  private tokenManager: TokenManager;

  constructor(
    @inject(AzureAuthProvider) azureAuthProvider: AzureAuthProvider,
    @inject(UserRepository) userRepository: UserRepository,
    @inject(TokenManager) tokenManager: TokenManager
  ) {
    super();
    this.azureAuthProvider = azureAuthProvider;
    this.userRepository = userRepository;
    this.tokenManager = tokenManager;
  }

  protected async authenticateUser(credentials: any): Promise<AuthResponse> {
    const userEmail = await this.getUserEmail(credentials);

    const user = await this.userRepository.findUserByEmail(userEmail);
    if (!user) throw userNotFound;
    if (!user.active) throw userInactive;

    const accessToken = this.tokenManager.generateAccessToken(user);
    const refreshToken = await this.tokenManager.generateRefreshToken(user._id);

    return { accessToken, refreshToken };
  }

  private async getUserEmail(credentials: {
    code: string;
    redirectUri: string;
  }) {
    const { code, redirectUri } = credentials;
    const azureAccessToken = await this.azureAuthProvider.getTokens(
      code,
      redirectUri
    );
    const userInfo = await this.azureAuthProvider.getUserInfo(azureAccessToken);

    return userInfo.email;
  }
}

export default AzureAuthService;
