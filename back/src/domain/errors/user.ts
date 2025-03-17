import { BadRequest, NotFound, Unauthorized } from ".";

export const userNotFound = new NotFound("user_not_found");
export const userInactive = new BadRequest("user_inactive");
export const UserAlreadyExist = new BadRequest("unable_account");
export const UserUnauthorized = new Unauthorized("user_unauthorized");
export const userCredentialsInvalid = new Unauthorized("credentials_invalid");
