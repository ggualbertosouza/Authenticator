import mongoose from "mongoose";
import { Injectable } from "../../utils/inversify";

import RefreshToken from "../models/token";

import { BINDINGSCOPE } from "../../@types/inverisfy";
import { ITokenRepository } from "../../domain/repositories/token";

@Injectable({
  key: TokenRepository,
  scope: BINDINGSCOPE.SINGLETON,
})
class TokenRepository implements ITokenRepository {
  private tokenModel = RefreshToken.getModel();

  public async create(
    token: string,
    expiresAt: Date,
    userId: mongoose.Types.ObjectId
  ) {
    await this.tokenModel.create({ token, expiresAt, userId });
  }

  public async delete(token: string) {
    await this.tokenModel.deleteOne({ token });
  }

  public async findByToken(token: string) {
    return await this.tokenModel.findOne({ token });
  }

  public async findByUser(userId: mongoose.Types.ObjectId) {
    return await this.tokenModel.findOne({ userId });
  }

  public async deleteExpiredtokens() {
    await this.tokenModel.deleteMany({ expiresAt: { $lt: new Date() } });
  }
}

export default TokenRepository;
