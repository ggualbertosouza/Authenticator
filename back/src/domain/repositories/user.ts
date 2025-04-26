import { UserJSON } from "../entities/types";

export interface IUserRepository {
  createId(id?: string): string;
  create(userData: UserJSON): Promise<{ id: string } | null>;
  findById(id: string): Promise<UserJSON | null>;
  findByEmail(email: string): Promise<UserJSON | null>;
  update(id: string, userData: Partial<UserJSON>): Promise<UserJSON | null>;
  delete(id: string): Promise<boolean | null>;
}
