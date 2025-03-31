import mongoose from "mongoose";
import RefreshToken from "../../infra/models/token";

export interface ITokenRepository {
  create(token: string, expiresAt: Date, userId: mongoose.Types.ObjectId): any;
  delete(token: string): Promise<void>;
  findByToken(token: string): Promise<RefreshToken | null>;
  findByUser(userId: mongoose.Types.ObjectId): Promise<RefreshToken | null>;
  deleteExpiredtokens(): void;
}
