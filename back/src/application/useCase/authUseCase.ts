import { inject } from "inversify";
import { Injectable } from "../../utils/inversify";

import AuthStrategy from "../../domain/service/authenticate";
import { AuthResponse } from "../dto/user";
import { BINDINGSCOPE } from "../../@types/inverisfy";

@Injectable({
  key: AuthUseCase,
  scope: BINDINGSCOPE.SINGLETON,
})
class AuthUseCase {
  private strategy: AuthStrategy;

  constructor(@inject(AuthStrategy) strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: AuthStrategy) {
    this.strategy = strategy;
  }

  public async execute(credentials: any): Promise<AuthResponse> {
    return this.strategy.authenticate(credentials);
  }
}

export default AuthUseCase;
