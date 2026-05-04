import mongoose from "mongoose";

export const TypeString = mongoose.Schema.Types.String;
export const TypeArray = mongoose.Schema.Types.Array;
export const TypeBoolean = mongoose.Schema.Types.Boolean;
export const TypeNumber = mongoose.Schema.Types.Number;
export const TypeObjectId = mongoose.Schema.Types.ObjectId;
export const TypeDecimal = mongoose.Schema.Types.Decimal128;
export const TypeDate = mongoose.Schema.Types.Date;
export const TypeMixed = mongoose.Schema.Types.Mixed;

export const ObjectID = mongoose.Schema.Types.ObjectId;

// Type definitions
export type SchemaTypeString = typeof TypeString;
export type SchemaTypeArray = typeof TypeArray;
export type SchemaTypeBoolean = typeof TypeBoolean;
export type SchemaTypeNumber = typeof TypeNumber;
export type SchemaTypeObjectId = typeof TypeObjectId;
export type SchemaTypeDecimal = typeof TypeDecimal;
export type SchemaTypeDate = typeof TypeDate;
export type SchemaTypeMixed = typeof TypeMixed;
