import { ConfidentialClientApplication } from "@azure/msal-node";

import { OAuthProvider } from "..";
import { AZURE } from "../../../../config";

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
    return this.msalInstance.getAuthCodeUrl({ scopes, redirectUri });
  }

  public async getTokens(
    code: string,
    redirectUri: string,
    scopes: string[] = ["user.read"]
  ): Promise<string> {
    const tokens = await this.msalInstance.acquireTokenByCode({
      code,
      redirectUri,
      scopes,
    });

    return tokens.accessToken;
  }

  public async getUserInfo(accessToken: string): Promise<any> {
    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  }
}

export default AzureAuthProvider;
