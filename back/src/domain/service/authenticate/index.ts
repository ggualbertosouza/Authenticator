import { AuthResponse } from "../../../application/dto/user";
import { Injectable } from "../../../utils/inversify";

export enum AuthStrategies {
  EMAILPASSWORD = "EmailPassword",
  AZURE = "Azure",
}

abstract class AuthStrategy {
  public async authenticate(credentials: any): Promise<AuthResponse> {
    const authResult = await this.authenticateUser(credentials);

    await this.logAuthentication(authResult);

    return authResult;
  }

  protected abstract authenticateUser(credentials: any): Promise<AuthResponse>;

  protected async logAuthentication(authResult: AuthResponse): Promise<void> {
    // #TODO Implementar auditoria
  }
}

export default AuthStrategy;
