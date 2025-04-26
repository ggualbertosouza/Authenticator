import { AuthOutput } from "../../dto/output/auth";
import { ISessionService } from "../../../domain/service/session";

export enum AuthStrategies {
  DEFAULT = "Default",
  AZURE = "Azure",
}

abstract class AuthStrategy<Strategy> {
  protected sessionService: ISessionService;

  constructor(sessionService: ISessionService) {
    this.sessionService = sessionService;
  }

  public async authenticateUser(credentials: Strategy): Promise<AuthOutput> {
    const authResult = await this.authenticate(credentials);

    await this.logAuthentication(authResult);

    return authResult;
  }

  protected abstract authenticate(credentials: Strategy): Promise<AuthOutput>;

  protected async logAuthentication(authResult: AuthOutput): Promise<void> {
    const user = await this.sessionService.get(authResult);

    console.log(`Usuário ${user.userId} Logou!`);
  }
}

export default AuthStrategy;
