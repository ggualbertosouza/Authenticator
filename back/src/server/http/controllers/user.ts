import mongoose from "mongoose";
import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

import UserService from "../../../domain/service/user/index";
import { RequestAdapter } from "../../../@types/server";

@injectable()
class UserController {
  private userService: UserService;

  constructor(@inject(UserService) userService: UserService) {
    this.userService = userService;
  }

  public createUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await this.userService.createUser(req.body);
        res.status(201).json(user);
      } catch (error) {
        next(error);
      }
    };
  }

  public findUser() {
    return async (req: RequestAdapter, res: Response, next: NextFunction) => {
      try {
        const tokenInfo = req.token!;
        const user = await this.userService.findUser(tokenInfo);

        res.status(200).json(user);
      } catch (error) {
        next(error);
      }
    };
  }

  public editUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await this.userService.editUser(req.body);

        res.status(200).json(user);
      } catch (error) {
        next(error);
      }
    };
  }

  public removeUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;

        const user = await this.userService.removeUser(
          mongoose.Types.ObjectId.createFromHexString(id)
        );

        res.status(200).json(user);
      } catch (error) {
        next(error);
      }
    };
  }
}

export default UserController;
