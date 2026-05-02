const mongoose = require("mongoose");
const schemaType = require("../../Types/index");

const userSchema = new mongoose.Schema(
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

module.exports = userSchema;
