import { AuthResponse } from "../../../application/dto/user";

abstract class AuthStrategy {
  // Template Method - Define flow of authenticate
  public async authenticate(credentials: any): Promise<AuthResponse> {
    // 1. Authenticate User
    const authResult = await this.authenticateUser(credentials);

    // 2. Register audiction
    await this.logAuthentication(authResult);

    // 3. Return user
    return authResult;
  }

  protected abstract authenticateUser(credentials: any): Promise<AuthResponse>;

  protected async logAuthentication(authResult: AuthResponse): Promise<void> {
    // #TODO Implementar auditoria
  }
}

export default AuthStrategy;
