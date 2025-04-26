import { UserJSON } from "../entities/types";
import User from "../entities/user";

export interface IUserRepository {
  create(userData: UserJSON): Promise<(UserJSON & { id: string }) | null>;
  findById(id: string): Promise<UserJSON | null>;
  findByEmail(email: string): Promise<UserJSON | null>;
  update(userData: Partial<UserJSON>): Promise<boolean | null>;
  delete(id: string): Promise<boolean | null>;
}
