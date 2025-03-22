import { inject } from "inversify";
import AbstractRouter from ".";
import AzureController from "../controllers/azure";

class AzureRouter extends AbstractRouter {
  private azureController: AzureController;

  constructor(@inject(AzureController) azureController: AzureController) {
    super();
    this.azureController = azureController;

    this.initializeRoute();
  }

  protected initializeRoute(): void {
    this.router.get(
      "/oauth/azure/url",
      this.azureController.azureGetRedirectUri()
    );
    this.router.post(
      "/oauth/azure/callback",
      this.azureController.azureAuthenticate()
    );
  }
}
