import jwt from "jsonwebtoken";
import Config from "../../Config/index.js";
import type { Request, Response, NextFunction } from "express";
import type { AuthRequest, IUser } from "../../Helpers/types.js";

const JWT_SECRETS: (string | undefined)[] = [
  Config.ADMIN_SECRET,
  Config.STUDENT_SECRET,
];

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    let user: IUser | undefined;
    let isLegacyToken = false;

    if (!token) {
      res.status(401).json({ status: 401, message: "Unauthorized." });
      return;
    }

    jwt.verify(token, Config.JWT_SECRET || "", (err: any, decoded: any) => {
      if (err) {
        isLegacyToken = true;
        return;
      }
      user = decoded;
    });

    if (isLegacyToken) {
      for (const secret of JWT_SECRETS) {
        try {
          const payload = jwt.verify(token, secret || "");
          if (payload) {
            user = payload as IUser;

            if (secret === Config.ADMIN_SECRET) {
              user.isAdmin = true;
            }

            const new_token = jwt.sign(payload, Config.JWT_SECRET || "");
            res.setHeader("Update-Token", new_token);
            res.setHeader("Access-Control-Expose-Headers", "Update-Token");
            break;
          }
        } catch (err) {
          // Continue to next secret
        }
      }
    }

    if (!user) {
      res.status(401).json({ status: 401, message: "Token Unauthorized." });
      return;
    }

    (req as AuthRequest).user = user;
    next();
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error during authentication.",
    });
  }
};
