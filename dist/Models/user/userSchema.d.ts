import mongoose from "mongoose";
import type { Document } from "mongoose";
export interface IUserSchema extends Document {
    email: string;
    password: string;
    status: "active" | "inactive";
    country?: mongoose.Types.ObjectId;
    city?: mongoose.Types.ObjectId[];
    campus?: mongoose.Types.ObjectId[];
    isSuperAdmin: boolean;
    role?: "ADMIN" | "CAMPUS_MANAGER" | "RECEPTIONIST";
    permissions: Record<string, string[]>;
    is_dev: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const userSchema: mongoose.Schema<IUserSchema, mongoose.Model<IUserSchema, any, any>, undefined, {}>;
export default userSchema;
//# sourceMappingURL=userSchema.d.ts.map