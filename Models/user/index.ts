import mongoose from "mongoose";
import userSchema from "./userSchema.js";
import type { IUserSchema } from "./userSchema.js";

const user = mongoose.model<IUserSchema>("User", userSchema);

export default user;
