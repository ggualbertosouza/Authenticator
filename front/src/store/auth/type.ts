export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};
