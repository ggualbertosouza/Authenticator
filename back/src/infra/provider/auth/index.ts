export abstract class OAuthProvider {
  abstract getAuthUrl(redirectUri: string, scopes: string[]): Promise<string>;
  abstract getTokens(
    code: string,
    redirectUri: string,
    scopes: string[]
  ): Promise<string>;
  abstract getUserInfo(accessToken: string): Promise<any>;
}
