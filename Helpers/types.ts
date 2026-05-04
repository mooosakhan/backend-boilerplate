import type { Request, Response, NextFunction } from "express";
import type { Document } from "mongoose";
import type { JwtPayload } from "jsonwebtoken";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  status: "active" | "inactive";
  country?: string;
  city?: string[];
  campus?: string[];
  isSuperAdmin: boolean;
  isAdmin?: boolean;
  role?: "admin" | "user" | "ADMIN" | "CAMPUS_MANAGER" | "RECEPTIONIST";
  permissions?: Record<string, string[]>;
  is_dev?: boolean;
}

export interface AuthRequest extends Request {
  user?: IUser | JwtPayload | any;
}

export interface AuthMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}

export interface AuthorizeMiddleware {
  (role: string | string[]): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
