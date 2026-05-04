import mongoose from "mongoose";
import type { ValidationError } from "joi";

interface ValidationHelpers {
  message: (msg: string) => ValidationError;
}

export const objectIdValidator = (value: string, helpers: ValidationHelpers): string => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId") as any;
  }
  return value;
};

export interface IValidationResult {
  error: ValidationError | undefined;
  value: any;
}
