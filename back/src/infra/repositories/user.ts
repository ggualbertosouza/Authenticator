import mongoose from "mongoose";
import { Injectable } from "../../presentation/https/utils/inversify";

import User from "../models/user";
import UserDomain from "../../domain/entities/user";
import { BINDINGSCOPE } from "../../@types/inverisfy";
import { IUserRepository } from "../../domain/repositories/user";

@Injectable({
  key: UserRepository,
  scope: BINDINGSCOPE.SINGLETON,
})
class UserRepository implements IUserRepository {
  private userModel = User.getModel();

  public async create(userData: UserDomain) {
    return await this.userModel.create(userData.toJSON());
  }

  public async findById(id: mongoose.Types.ObjectId) {
    return await this.userModel
      .findOne({ _id: id }, { active: 1, email: 1, name: 1, role: 1 })
      .lean();
  }

  public async findByEmail(email: string) {
    return await this.userModel
      .findOne(
        { email },
        { _id: 1, email: 1, name: 1, role: 1, password: 1, active: 1 },
      )
      .lean();
  }

  public async update(userData: UserDomain) {
    const userUpdated = await this.userModel
      .findOneAndUpdate(
        { email: userData.toJSON().email },
        { $set: userData },
        {
          new: true,
          projection: {
            name: 1,
            email: 1,
            role: 1,
            active: 1,
          },
        },
      )
      .lean();

    return userUpdated;
  }

  public async delete(id: mongoose.Types.ObjectId) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { active: false } },
      { new: true },
    );

    return !!user;
  }
}

export default UserRepository;
