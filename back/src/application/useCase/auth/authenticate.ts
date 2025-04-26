import { inject } from "inversify";

import { AuthStrategies } from ".";
import AzureAuthentication from "./azure";
import DefaultAuthentication from "./default";

import { Injectable } from "../../../presentation/https/utils/inversify";

@Injectable({ key: AuthUseCase })
class AuthUseCase {
  private defaultAuth: DefaultAuthentication;
  private azureAuth: AzureAuthentication;

  constructor(
    @inject(DefaultAuthentication) defaultAuthentication: DefaultAuthentication,
    @inject(AzureAuthentication) azureAuthentication: AzureAuthentication,
  ) {
    this.defaultAuth = defaultAuthentication;
    this.azureAuth = azureAuthentication;
  }

  public async authenticate(credentials: any, strategy: AuthStrategies) {
    switch (strategy) {
      case AuthStrategies.AZURE:
        return this.azureAuth.authenticateUser(credentials);
      case AuthStrategies.DEFAULT:
        return this.defaultAuth.authenticateUser(credentials);
      default:
        throw new Error();
    }
  }
}

export default AuthUseCase;
