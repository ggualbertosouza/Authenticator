import mongoose from "mongoose";
import { Injectable } from "../../utils/inversify";

import RefreshToken from "../models/token";

import { BINDINGSCOPE } from "../../@types/inverisfy";

@Injectable({
  key: TokenRepository,
  scope: BINDINGSCOPE.SINGLETON,
})
class TokenRepository {
  private tokenModel = RefreshToken.getModel();

  public async create(
    token: string,
    expiresAt: Date,
    userId: mongoose.Types.ObjectId
  ) {
    await this.tokenModel.create({ token, expiresAt, userId });
  }

  public async delete(token: string): Promise<void> {
    await this.tokenModel.deleteOne({ token });
  }

  public async findByToken(token: string): Promise<RefreshToken | null> {
    return await this.tokenModel.findOne({ token });
  }

  public async findByUser(
    userId: mongoose.Types.ObjectId
  ): Promise<RefreshToken | null> {
    return await this.tokenModel.findOne({ userId });
  }

  public async deleteExpiredtokens() {
    await this.tokenModel.deleteMany({ expiresAt: { $lt: new Date() } });
  }
}

export default TokenRepository;
