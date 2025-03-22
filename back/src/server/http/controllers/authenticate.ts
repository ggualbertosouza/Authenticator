import { inject } from "inversify";
import { Injectable } from "../../../utils/inversify";
import { NextFunction } from "express";

import { RequestAdapter, ResponseAdapter } from "../../../@types/server";

import { NODE_ENV } from "../../../config";
import AuthUseCase from "../../../application/useCase/authUseCase";
import EmailPasswordStrategy from "../../../domain/service/authenticate/emailPassword";
import { BINDINGSCOPE } from "../../../@types/inverisfy";

@Injectable({
  key: AuthController,
  scope: BINDINGSCOPE.SINGLETON,
})
class AuthController {
  private authUseCase: AuthUseCase;
  private emailPassword: EmailPasswordStrategy;

  constructor(
    @inject(AuthUseCase) authUsecase: AuthUseCase,
    @inject(EmailPasswordStrategy) emailPassword: EmailPasswordStrategy
  ) {
    this.authUseCase = authUsecase;
    this.emailPassword = emailPassword;
  }

  public loginWithEmailPassword() {
    return async (
      req: RequestAdapter,
      res: ResponseAdapter,
      next: NextFunction
    ) => {
      try {
        this.authUseCase.setStrategy(this.emailPassword);
        const authResponse = await this.authUseCase.execute(req.body);

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
