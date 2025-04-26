import { inject } from "inversify";

import AuthStrategy from ".";

import { Injectable } from "../../../presentation/https/utils/inversify";

import { AzureAuth } from "../../dto/input/auth";
import { AuthOutput } from "../../dto/output/auth";

import SessionService from "../../../infra/services/session";
import UserRepository from "../../../infra/repositories/user";
import AzureAuthProvider from "../../../infra/provider/auth/azure";

import { ISessionService } from "../../../domain/service/session";
import { IUserRepository } from "../../../domain/repositories/user";
import { InvalidUser, UserDisabled } from "../../../domain/error/user";
import { IAuthProvider } from "../../../domain/providers/oauth";

@Injectable({ key: AzureAuthentication })
class AzureAuthentication extends AuthStrategy<AzureAuth> {
  private authProvider: IAuthProvider;
  private userRepository: IUserRepository;
  protected sessionService: ISessionService;

  constructor(
    @inject(AzureAuthProvider) authProvider: IAuthProvider,
    @inject(UserRepository) userRepository: IUserRepository,
    @inject(SessionService) sessionService: ISessionService,
  ) {
    super(sessionService);
    this.authProvider = authProvider;
    this.userRepository = userRepository;
    this.sessionService = sessionService;
  }

  protected async authenticate(credentials: AzureAuth): Promise<AuthOutput> {
    const accessToken = await this.authProvider.getAccessToken(credentials);
    const userInfo = await this.authProvider.getUserInfo(accessToken);

    const user = await this.getUser(userInfo.email);

    return await this.sessionService.create(user.id);
  }

  private async getUser(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new InvalidUser();
    if (!user.active) throw new UserDisabled();

    return user;
  }
}

export default AzureAuthentication;
