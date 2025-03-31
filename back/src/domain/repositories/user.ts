import mongoose from "mongoose";
import User from "../../infra/models/user";

export interface IUserRepository {
  create(userData: Omit<User, "active" | "role">): any;
  findById(id: mongoose.Types.ObjectId): any;
  findByEmail(email: string): any;
  update(userData: Partial<User>): any;
  delete(id: mongoose.Types.ObjectId): any;
}
