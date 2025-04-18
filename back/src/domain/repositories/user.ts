import mongoose from "mongoose";
import User from "../entities/user";

export interface IUserRepository {
  create(userData: User): any;
  findById(id: mongoose.Types.ObjectId): any;
  findByEmail(email: string): any;
  update(userData: Partial<User>): any;
  delete(id: mongoose.Types.ObjectId): any;
}
