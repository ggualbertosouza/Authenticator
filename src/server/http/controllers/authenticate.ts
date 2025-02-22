import { inject, injectable } from "inversify";
import AuthUseCase from "../../../application/useCase/authUseCase";
import { NextFunction, Request, Response } from "express";
import EmailPasswordStrategy from "../../../domain/service/authenticate/emailPassword";

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

        res.status(200).json(authResponse);
      } catch (error) {
        next(error);
      }
    };
  }
}

export default AuthController;
