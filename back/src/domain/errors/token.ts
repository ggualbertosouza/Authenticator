import { BadRequest, Unauthorized } from ".";

export const refreshTokenError = new BadRequest("refresh_token_error");
export const invalidToken = new Unauthorized("invalid_token");
