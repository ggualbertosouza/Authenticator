import { inject, injectable } from "inversify";

import TokenManager from "../../../domain/service/token";
import { BaseMiddleware } from ".";
import { NextFunction } from "express";
import { invalidToken } from "../../../domain/errors/token";
import { RequestAdapter, ResponseAdapter } from "../../../@types/server";

@injectable()
class AuthMiddleware extends BaseMiddleware {
  private tokenManager: TokenManager;

  constructor(@inject(TokenManager) tokenManager: TokenManager) {
    super();
    this.tokenManager = tokenManager;
  }

  build(req: RequestAdapter, res: ResponseAdapter, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) throw invalidToken;

    const token = authHeader.split(" ")[1];

    try {
      const tokenInfo = this.tokenManager.validateAccessToken(token);

      req.token = tokenInfo;
      next();
    } catch (error) {
      throw invalidToken;
    }
  }
}

export default AuthMiddleware;
