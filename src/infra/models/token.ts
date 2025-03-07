import { prop, Ref } from "@typegoose/typegoose";

import BaseModel from ".";
import User from "./user";

class RefreshToken extends BaseModel<RefreshToken> {
  @prop({ required: true, type: String })
  token!: string;

  @prop({ required: true, type: Date })
  expiresAt!: Date;

  @prop({ required: true, ref: User })
  userId!: Ref<User>;
}

export default RefreshToken;
