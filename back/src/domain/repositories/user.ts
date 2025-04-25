import User from "../entities/user";

export interface IUserRepository {
  create(userData: User): Promise<boolean | null>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(userData: Partial<User>): Promise<boolean | null>;
  delete(id: string): Promise<boolean | null>;
}
