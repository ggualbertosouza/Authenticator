import mongoose from "mongoose";

export interface ITokenManager {
  generateAccessToken(user: any): string;
  validateAccessToken(token: string): { userId: string; role: string };
  generateRefreshToken(userId: mongoose.Types.ObjectId): Promise<string>;
  validateRefreshToken(token: string): { userId: string };
  invalidateRefreshToken(token: string): Promise<void>;
  isValidRefreshToken(token: string): Promise<boolean>;
  cleanExpiredTokens(): void;
}
