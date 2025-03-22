import { NotFound, BadRequest, Unauthorized } from "./statusError";

// User errors
export const userNotFound = new NotFound("user_not_found");
export const userInactive = new BadRequest("user_inactive");
export const UserAlreadyExist = new BadRequest("unable_account");
export const UserUnauthorized = new Unauthorized("user_unauthorized");
export const userCredentialsInvalid = new Unauthorized("credentials_invalid");

// Azure errors
export const azureFetchError = new BadRequest("azure_user_info");
export const azureAcquireTokenError = new BadRequest("azure_acquire_error");
export const azureGenerateUrlError = new BadRequest("azure_url_generate");

// Token errors
export const refreshTokenError = new BadRequest("refresh_token_error");
export const invalidToken = new Unauthorized("invalid_token");
