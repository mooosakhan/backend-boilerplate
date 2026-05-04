import type { Request, Response, NextFunction } from "express";
import { ROLES } from "../../Constant/index.js";
import type { AuthRequest, IUser } from "../../Helpers/types.js";

type PermittedRoles = typeof ROLES[keyof typeof ROLES] | typeof ROLES[keyof typeof ROLES][];

export const authorize = (permittedRoles: PermittedRoles) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as AuthRequest).user as IUser | undefined;
      const rolesArr = Object.values(ROLES) || [];

      if (!user) {
        res.status(401).json({
          status: 401,
          message: "Unauthorized.",
        });
        return;
      }

      const rolesToCheck = Array.isArray(permittedRoles)
        ? permittedRoles
        : [permittedRoles];

      if (!rolesToCheck || !rolesToCheck.length) {
        res.status(400).json({
          status: 400,
          message: "No roles specified.",
        });
        return;
      }

      const invalidRoles = rolesToCheck.filter(
        (role) => !rolesArr.includes(role)
      );

      if (invalidRoles.length > 0) {
        res.status(400).json({
          status: 400,
          message: `Invalid role(s) specified: ${invalidRoles.join(", ")}.`,
        });
        return;
      }

      if (!user.role || (!user.isAdmin && !rolesToCheck.includes(user.role as any))) {
        res.status(403).json({
          status: 403,
          message: "Unauthorized role.",
        });
        return;
      }

      if (user.isAdmin) {
        // const userExist = await findOne("user", { _id: user.id });
        // Note: Uncomment when findOne is available from Helpers
      }

      next();
    } catch (err) {
      console.log("Error authorizing user =>", err);
      res.status(500).json({
        status: 500,
        message: "Internal server error during authorization.",
      });
    }
  };
};
