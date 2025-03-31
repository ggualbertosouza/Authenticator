import { inject } from "inversify";
import { NextFunction } from "express";
import { Injectable } from "../../../utils/inversify";

import { BINDINGSCOPE } from "../../../@types/inverisfy";
import { RequestAdapter, ResponseAdapter } from "../../../@types/server";

import AzureAuthProvider from "../../../infra/provider/auth/azure";
import AzureAuthService from "../../../domain/service/authenticate/azure";

@Injectable({
  key: AzureController,
  scope: BINDINGSCOPE.SINGLETON,
})
class AzureController {
  private azureAuthProvider: AzureAuthProvider;
  private azureAuthService: AzureAuthService;

  constructor(
    @inject(AzureAuthProvider) azureAuthProvider: AzureAuthProvider,
    @inject(AzureAuthService) azureAuthService: AzureAuthService
  ) {
    this.azureAuthProvider = azureAuthProvider;
    this.azureAuthService = azureAuthService;
  }

  public azureGetRedirectUri() {
    return async (
      req: RequestAdapter,
      res: ResponseAdapter,
      next: NextFunction
    ) => {
      try {
        const url = `${req.protocol}://${req.host}/oauth/azure/callback`;
        const redirectUri = await this.azureAuthProvider.getAuthUrl(url);

        res.status(200).json(redirectUri);
      } catch (error) {
        next(error);
      }
    };
  }
}

export default AzureController;
