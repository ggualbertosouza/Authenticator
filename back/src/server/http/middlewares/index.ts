import { NextFunction } from "express";
import { RequestAdapter, ResponseAdapter } from "../../../@types/server";

export abstract class BaseMiddleware {
  abstract build(
    req: RequestAdapter,
    res: ResponseAdapter,
    next: NextFunction
  ): void;
}
