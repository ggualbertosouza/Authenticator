import { inject } from "inversify";
import { Injectable } from "../../../utils/inversify";
import AbstractRouter from ".";
import AuthController from "../controllers/authenticate";
import { BINDINGSCOPE } from "../../../@types/inverisfy";

@Injectable({
  key: AuthRouter,
  scope: BINDINGSCOPE.SINGLETON,
})
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
    this.router.post(
      "/oauth/azure/callback",
      this.authController.azureAuthenticate()
    );
  }
}

export default AuthRouter;
