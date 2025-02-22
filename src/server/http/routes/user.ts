import { inject, injectable } from "inversify";

import AbstractRouter from ".";
import UserController from "../controllers/user";

@injectable()
class UserRouter extends AbstractRouter {
  private userController: UserController;

  constructor(@inject(UserController) userController: UserController) {
    super();
    this.userController = userController;

    this.initializeRoute();
  }

  protected initializeRoute(): void {
    this.router.post("/api/user/signup", this.userController.createUser());
    this.router.get("/api/user/:id", this.userController.findUser());
    this.router.put("api/user/:id", this.userController.editUser());
    this.router.delete("/api/user/:id", this.userController.removeUser());
  }
}

export default UserRouter;
