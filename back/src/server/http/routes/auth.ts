import { inject, injectable } from "inversify";
import AbstractRouter from ".";
import AuthController from "../controllers/authenticate";

@injectable()
class AuthRouter extends AbstractRouter {
  private authController: AuthController;

  constructor(@inject(AuthController) authController: AuthController) {
    super();
    this.authController = authController;

    this.initializeRoute();
  }

  protected initializeRoute(): void {
    this.router.post(
      "/api/user/login",
      this.authController.loginWithEmailPassword()
    );
  }
}

export default AuthRouter;
