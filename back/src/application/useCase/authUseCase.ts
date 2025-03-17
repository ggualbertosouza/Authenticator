import { inject, injectable } from "inversify";
import AuthStrategy from "../../domain/service/authenticate";
import { AuthResponse } from "../dto/user";

@injectable()
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
