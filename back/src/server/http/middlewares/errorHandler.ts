import i18n from "../../../config/i18n";
import { Request, Response, NextFunction } from "express";
import HttpError from "../../../domain/errors/httpErrors";

export const ErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = Number(err.status) || 500;
  const name = err.name || "internal_server_error";
  const message = i18n.__(err.message || "INTERNAL_SERVER_ERROR");

  const lang =
    req.query.lang ||
    req.cookies.lang ||
    req.headers["accept-language"] ||
    "pt-br";

  i18n.setLocale(lang);

  res.status(code).json({
    name,
    message,
  });
};
