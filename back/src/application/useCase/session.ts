import { inject } from "inversify";

import SessionService from "../../infra/services/session";

import { ISessionUseCase } from "../interfaces/session";
import { ISessionService } from "../../domain/service/session";

class SessionUseCase implements ISessionUseCase {
  private sessionService: ISessionService;

  constructor(@inject(SessionService) sessionService: ISessionService) {
    this.sessionService = sessionService;
  }

  public async refreshSession(token: string): Promise<string> {
    return await this.sessionService.refresh(token);
  }

  public async invalidateSession(token: string): Promise<void> {
    return await this.invalidateSession(token);
  }
}

export default SessionUseCase;
