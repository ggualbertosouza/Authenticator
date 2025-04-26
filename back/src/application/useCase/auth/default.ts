import { inject } from "inversify";
import { Injectable } from "../../../presentation/https/utils/inversify";

import AuthStrategy from ".";
import { DefaultAuth } from "../../dto/input/auth";
import { AuthOutput } from "../../dto/output/auth";

import SessionService from "../../../infra/services/session";
import UserRepository from "../../../infra/repositories/user";
import PasswordService from "../../../infra/services/password";

import { InvalidUser } from "../../../domain/error/user";
import { ISessionService } from "../../../domain/service/session";
import { IPasswordService } from "../../../domain/service/password";
import { IUserRepository } from "../../../domain/repositories/user";

@Injectable({ key: DefaultAuthentication })
class DefaultAuthentication extends AuthStrategy<DefaultAuth> {
  private userRepository: IUserRepository;
  private passwordService: IPasswordService;
  protected sessionService: ISessionService;

  constructor(
    @inject(UserRepository) userRepository: IUserRepository,
    @inject(PasswordService) passwordService: IPasswordService,
    @inject(SessionService) sessionService: ISessionService,
  ) {
    super(sessionService);
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.sessionService = sessionService;
  }

  protected async authenticate(credentials: DefaultAuth): Promise<AuthOutput> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) throw new InvalidUser();

    const isValidPassword = await this.passwordService.compare(
      credentials.password,
      user.password,
    );
    if (!isValidPassword) throw new InvalidUser();

    return await this.sessionService.create(user.id);
  }
}

export default DefaultAuthentication;
