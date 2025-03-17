import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "./token";

export type RequestAdapter = Request & {
  token?: TokenPayload;
};

export type ResponseAdapter = Response & {};
