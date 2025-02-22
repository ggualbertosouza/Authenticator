import mongoose from "mongoose";
import { injectable } from "inversify";

import { User } from "../models/user";

@injectable()
class UserRepository {
  private userModel = User.getModel();

  public async createUser(userData: Omit<User, "active" | "role">) {
    const user = await this.userModel.create(userData);

    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  public async findUser(id: mongoose.Types.ObjectId) {
    return await this.userModel
      .findOne({ _id: id }, { active: 1, email: 1, name: 1, role: 1 })
      .lean();
  }

  public async findUserByEmail(email: string) {
    return await this.userModel
      .findOne(
        { email },
        { _id: 1, email: 1, name: 1, role: 1, password: 1, active: 1 }
      )
      .lean();
  }

  public async editUser(userData: Partial<User>) {
    const userUpdated = await this.userModel
      .findOneAndUpdate(
        { email: userData.email },
        { $set: userData },
        {
          new: true,
          projection: {
            name: 1,
            email: 1,
            role: 1,
            active: 1,
          },
        }
      )
      .lean();

    return userUpdated;
  }

  public async removeUser(id: mongoose.Types.ObjectId) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: { active: false } },
      { new: true }
    );

    return !!user;
  }
}

export default UserRepository;
