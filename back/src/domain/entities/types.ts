import { Roles } from "../constants/roles";

export interface UserToCreate {
  name: string;
  email: string;
  password: string;
  role?: Roles;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserJSON {
  name: string;
  email: string;
  password: string;
  active: boolean;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}
