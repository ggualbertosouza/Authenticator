import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { inject } from "inversify";

import { TokenPayload } from "../../@types/token";
import { invalidToken, refreshTokenError } from "../error";

import CronJobManager from "./cron";
import { TOKEN } from "../../config";

import TokenRepository from "../repositories/token";
import { Injectable } from "../../presentation/https/utils/inversify";
import { ITokenManager } from "../../domain/service/tokens";

@Injectable({ key: TokenManager })
class TokenManager implements ITokenManager {
  private readonly ACCESS_TOKEN_SECRET: string = TOKEN.jwt_secret;
  private readonly REFRESH_TOKEN_SECRET: string = TOKEN.refresh_token_secret;

  private readonly refreshTokenRenewalThreshold: number = 1;
  private readonly refreshTokenExpirationDays: number = 7;

  private tokenRepository: TokenRepository;
  private cronJobManager: CronJobManager;

  constructor(
    @inject(TokenRepository) tokenRepository: TokenRepository,
    @inject(CronJobManager) cronJobManager: CronJobManager,
  ) {
    this.tokenRepository = tokenRepository;
    this.cronJobManager = cronJobManager;

    this.cleanExpiredTokens();
  }

  // #TODO Alterar forma como é pego userId -> Melhorar tipagem da entidade
  public generateAccessToken(user: any): string {
    return jwt.sign(
      { userId: String(user._id), role: user.role },
      this.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );
  }

  public validateAccessToken(token: string): { userId: string; role: string } {
    try {
      return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as TokenPayload;
    } catch (error) {
      throw invalidToken;
    }
  }

  public async generateRefreshToken(
    userId: mongoose.Types.ObjectId,
  ): Promise<string> {
    try {
      const existingToken = await this.tokenRepository.findByUser(userId);

      if (existingToken) {
        const now = new Date();
        const expiresAt = existingToken.expiresAt;

        const timeRemaining = expiresAt.getTime() - now.getTime();
        const daysRemaining = timeRemaining / (1000 * 60 * 60 * 24);

        if (daysRemaining > this.refreshTokenRenewalThreshold) {
          return existingToken.token;
        }

        await this.tokenRepository.delete(existingToken.token);
      }

      const refreshToken = jwt.sign({ userId }, this.REFRESH_TOKEN_SECRET, {
        expiresIn: `${this.refreshTokenExpirationDays}d`,
      });

      await this.tokenRepository.create(
        refreshToken,
        new Date(
          Date.now() + this.refreshTokenExpirationDays * 24 * 60 * 60 * 1000,
        ),
        userId,
      );

      return refreshToken;
    } catch (error) {
      console.error("Error while generating RefreshToken");
      throw refreshTokenError;
    }
  }

  public validateRefreshToken(token: string): { userId: string } {
    try {
      return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as {
        userId: string;
      };
    } catch (error) {
      throw invalidToken;
    }
  }

  public async invalidateRefreshToken(token: string): Promise<void> {
    await this.tokenRepository.delete(token);
  }

  // Verify if is valid token
  public async isValidRefreshToken(token: string): Promise<boolean> {
    const tokenDoc = await this.tokenRepository.findByToken(token);
    return !!tokenDoc && tokenDoc.expiresAt > new Date();
  }

  public cleanExpiredTokens() {
    this.cronJobManager.addJob(
      "cleanExpiredTokens",
      "0 0 * * *",
      () => {
        this.tokenRepository.deleteExpiredtokens();
        console.info("Expired tokens removed!");
      },
      true,
    );
  }
}

export default TokenManager;
