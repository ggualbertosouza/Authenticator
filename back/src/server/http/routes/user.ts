import { inject, injectable } from "inversify";

import AbstractRouter from ".";
import UserController from "../controllers/user";
import AuthMiddleware from "../middlewares/auth";
import { BaseMiddleware } from "../middlewares";

@injectable()
class UserRouter extends AbstractRouter {
  private userController: UserController;
  private middAuth: BaseMiddleware;

  constructor(
    @inject(UserController) userController: UserController,
    @inject(AuthMiddleware) middAuth: BaseMiddleware
  ) {
    super();
    this.userController = userController;
    this.middAuth = middAuth;

    this.initializeRoute();
  }

  protected initializeRoute(): void {
    this.router.post("/api/user/signup", this.userController.createUser());
    this.router.get(
      "/api/user",
      this.middAuth.build,
      this.userController.findUser()
    );
    this.router.put("/api/user/:id", this.userController.editUser());
    this.router.delete("/api/user/:id", this.userController.removeUser());
  }
}

export default UserRouter;
