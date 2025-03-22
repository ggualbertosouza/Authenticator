import { BadRequest } from ".";

export const azureFetchError = new BadRequest("azure_user_info");
export const azureAcquireTokenError = new BadRequest("azure_acquire_error");
export const azureGenerateUrlError = new BadRequest("azure_url_generate");
