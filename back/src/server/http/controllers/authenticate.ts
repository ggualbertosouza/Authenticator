import { inject } from "inversify";
import { NextFunction } from "express";
import { Injectable } from "../../../utils/inversify";

import { RequestAdapter, ResponseAdapter } from "../../../@types/server";
import { BINDINGSCOPE } from "../../../@types/inverisfy";

import { NODE_ENV } from "../../../config";
import AuthStrategy, {
  AuthStrategies,
} from "../../../domain/service/authenticate";

@Injectable({
  key: AuthController,
  scope: BINDINGSCOPE.SINGLETON,
})
class AuthController {
  constructor(
    @inject(AuthStrategy)
    private authStrategyFactory: (strategy: AuthStrategies) => AuthStrategy
  ) {}

  public loginWithEmailPassword() {
    return async (
      req: RequestAdapter,
      res: ResponseAdapter,
      next: NextFunction
    ) => {
      try {
        const strategy = this.authStrategyFactory(AuthStrategies.EMAILPASSWORD);
        const authResponse = await strategy.authenticate(req.body);

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

  public azureAuthenticate() {
    return async (
      req: RequestAdapter,
      res: ResponseAdapter,
      next: NextFunction
    ) => {
      try {
        const { code } = req.body;
        const redirectUri = `${req.protocol}://${req.host}/oauth/azure/callback`;

        const strategy = this.authStrategyFactory(AuthStrategies.AZURE);
        const authResponse = await strategy.authenticate({
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

  // #TODO Rota de logout - !! Remover cookie refreshToken
  public logout() {}
}

export default AuthController;
