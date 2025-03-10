import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

import AuthUseCase from "../../../application/useCase/authUseCase";
import EmailPasswordStrategy from "../../../domain/service/authenticate/emailPassword";
import { NODE_ENV } from "../../../config";

@injectable()
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
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        this.authUseCase.setStrategy(this.emailPassword);
        const authResponse = await this.authUseCase.execute(req.body);

        const {
          data: { refreshToken },
          ...result
        } = authResponse;

        res.cookie("/refresh-token", refreshToken, {
          httpOnly: true,
          secure: NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    };
  }

  // #TODO Rota de logout - !! Remover cookie refreshToken
  public logout() {}
}

export default AuthController;
