export type UserRequest = {
  email: string;
  name: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
};
