import { prop } from "@typegoose/typegoose";

import { BaseModel } from ".";
import { Roles } from "../../@types/roles";

export class User extends BaseModel<User> {
	@prop({ required: true, type: String })
	name!: string;

	@prop({ required: true, type: String, unique: true })
	email!: string;

	@prop({ required: true, type: String })
	password!: string;

	@prop({ required: true, type: String, enum: Roles, default: Roles.GUEST })
	role!: string;

	@prop({ required: true, type: Boolean, default: true })
	active!: boolean;
}
