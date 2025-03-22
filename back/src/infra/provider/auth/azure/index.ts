import axios from "axios";
import { ConfidentialClientApplication } from "@azure/msal-node";

import { OAuthProvider } from "..";
import { AZURE } from "../../../../config";
import {
  azureAcquireTokenError,
  azureFetchError,
  azureGenerateUrlError,
} from "../../../../domain/errors/azure";

interface UserInfo {
  id: string;
  displayName: string;
  email: string;
  userPrincipalName: string;
}

class AzureAuthProvider extends OAuthProvider {
  private msalInstance: ConfidentialClientApplication;

  constructor() {
    super();
    this.msalInstance = new ConfidentialClientApplication({
      auth: {
        clientId: AZURE.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${AZURE.TENANT_ID}`,
        clientSecret: AZURE.AZURE_SECRET,
      },
    });
  }

  public async getAuthUrl(
    redirectUri: string,
    scopes: string[] = ["user.read"]
  ) {
    try {
      return await this.msalInstance.getAuthCodeUrl({
        scopes,
        redirectUri,
      });
    } catch (error) {
      console.error("Failed to generate Azure auth URL:", error);
      throw azureGenerateUrlError;
    }
  }

  public async getTokens(
    code: string,
    redirectUri: string,
    scopes: string[] = ["user.read"]
  ): Promise<string> {
    try {
      const tokenResponse = await this.msalInstance.acquireTokenByCode({
        code,
        redirectUri,
        scopes,
      });

      if (!tokenResponse.accessToken) throw azureAcquireTokenError;

      return tokenResponse.accessToken;
    } catch (error) {
      console.error("Failed to acquire Azure tokens:", error);
      throw azureAcquireTokenError;
    }
  }

  public async getUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status !== 200) throw azureFetchError;

      return response.data as UserInfo;
    } catch (error) {
      console.error("Failed to fetch Azure user info:", error);
      throw azureFetchError;
    }
  }
}

export default AzureAuthProvider;
