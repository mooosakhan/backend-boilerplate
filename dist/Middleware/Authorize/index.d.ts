import type { Request, Response, NextFunction } from "express";
import { ROLES } from "../../Constant/index.js";
type PermittedRoles = typeof ROLES[keyof typeof ROLES] | typeof ROLES[keyof typeof ROLES][];
export declare const authorize: (permittedRoles: PermittedRoles) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map