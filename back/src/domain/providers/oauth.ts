export type AuthUser = {
  name: string;
  email: string;
  [key: string]: any;
};

export interface IAuthProvider {
  getAuthorizationUrl(state?: string): string;
  getAccessToken(data: { code: string; redirectUri: string }): Promise<string>;
  getUserInfo(accessToken: string): Promise<AuthUser>;
}
