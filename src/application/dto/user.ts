export type UserRequest = {
  email: string;
  name: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken?: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
};
