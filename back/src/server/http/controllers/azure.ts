import { inject } from "inversify";
import { NextFunction } from "express";
import { Injectable } from "../../../utils/inversify";

import { BINDINGSCOPE } from "../../../@types/inverisfy";
import { RequestAdapter, ResponseAdapter } from "../../../@types/server";

import AzureAuthProvider from "../../../infra/provider/auth/azure";
import AuthUseCase from "../../../application/useCase/authUseCase";
import AzureAuthService from "../../../domain/service/authenticate/azure";
import { NODE_ENV } from "../../../config";

@Injectable({
  key: AzureController,
  scope: BINDINGSCOPE.SINGLETON,
})
class AzureController {
  private azureAuthProvider: AzureAuthProvider;
  private azureAuthService: AzureAuthService;
  private authUseCase: AuthUseCase;

  constructor(
    @inject(AzureAuthProvider) azureAuthProvider: AzureAuthProvider,
    @inject(AzureAuthService) azureAuthService: AzureAuthService,
    @inject(AuthUseCase) authUseCase: AuthUseCase
  ) {
    this.azureAuthProvider = azureAuthProvider;
    this.azureAuthService = azureAuthService;
    this.authUseCase = authUseCase;
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

  public azureAuthenticate() {
    return async (
      req: RequestAdapter,
      res: ResponseAdapter,
      next: NextFunction
    ) => {
      try {
        const { code } = req.body;
        const redirectUri = `${req.protocol}://${req.host}/oauth/azure/callback`;

        this.authUseCase.setStrategy(this.azureAuthService);
        const authResponse = await this.authUseCase.execute({
          redirectUri,
          code,
        });

        const { accessToken, refreshToken } = authResponse;

        res.cookie("refresh-token", refreshToken, {
          httpOnly: true,
          secure: NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json(accessToken);
      } catch (error) {
        next(error);
      }
    };
  }
}

export default AzureController;
