import { inject } from "inversify";
import AuthStrategy from ".";
import { BINDINGSCOPE } from "../../../@types/inverisfy";
import { AuthResponse } from "../../../application/dto/user";
import AzureAuthProvider from "../../../infra/provider/auth/azure";
import { Injectable } from "../../../utils/inversify";
import UserRepository from "../../../infra/repository/user";
import { userInactive, userNotFound } from "../../errors/user";
import TokenManager from "../token";

@Injectable({
  key: AzureAuthService,
  scope: BINDINGSCOPE.SINGLETON,
})
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
    const { email } =
      await this.azureAuthProvider.getUserInfo(azureAccessToken);

    return email;
  }
}

export default AzureAuthService;
