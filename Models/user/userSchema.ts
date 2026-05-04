import mongoose from "mongoose";
import type { Document } from "mongoose";
import * as schemaType from "../../Types/index.js";

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

const userSchema = new mongoose.Schema<IUserSchema>(
  {
    email: { type: schemaType.TypeString, unique: true },
    password: { type: schemaType.TypeString },
    status: {
      type: schemaType.TypeString,
      enum: ["active", "inactive"],
      default: "active",
    },
    country: { type: schemaType.TypeObjectId, ref: "Country" },
    city: [{ type: schemaType.TypeObjectId, ref: "City" }],
    campus: [{ type: schemaType.TypeObjectId, ref: "Campus" }],
    isSuperAdmin: { type: schemaType.TypeBoolean, default: false },
    role: {
      type: schemaType.TypeString,
      enum: ["ADMIN", "CAMPUS_MANAGER", "RECEPTIONIST"],
    },
    permissions: { type: schemaType.TypeMixed, default: {} },
    is_dev: { type: schemaType.TypeBoolean, default: false },
  },
  { timestamps: true }
);

export default userSchema;
