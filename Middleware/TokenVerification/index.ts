import jwt from "jsonwebtoken";
import Config from "../../Config/index.js";
import type { Request, Response, NextFunction } from "express";
import type { AuthRequest, IUser } from "../../Helpers/types.js";

export const tokenVerification = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if (!token) {
      res
        .status(404)
        .send({ status: 404, message: "No token provided!" });
      return;
    }
    jwt.verify(token, Config.ADMIN_SECRET || "", async (err: any, decoded: any) => {
      if (err) {
        res
          .status(403)
          .send({ status: 403, message: "Token Unauthorized!" });
        return;
      }
      // const user = await findOne("user", { _id: decoded.id });
      // Note: Uncomment when findOne is available from Helpers
      // if (!user) {
      //   return res
      //     .status(403)
      //     .send({ status: 403, message: "Token Unauthorized!" });
      // }
      (req as AuthRequest).user = decoded as IUser;
      next();
    });
  } else {
    res.status(403).send({ status: 403, message: "Token is required" });
  }
};

interface SocketWithAuth {
  handshake: {
    auth?: {
      token?: string;
    };
  };
  user?: IUser;
}

export const socketTokenVerification = async (
  socket: SocketWithAuth,
  next: (error?: Error) => void
): Promise<void> => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("No token provided!"));
    }

    jwt.verify(token, Config.ADMIN_SECRET || "", async (err: any, decoded: any) => {
      if (err) {
        return next(new Error("Invalid or expired token!"));
      }

      // const user = await findOne("user", { _id: decoded.id });
      // Note: Uncomment when findOne is available from Helpers
      // if (!user) {
      //   return next(new Error("User not found or unauthorized!"));
      // }

      socket.user = decoded as IUser;
      next();
    });
  } catch (error) {
    console.error("Socket Token Verification Error:", error);
    return next(new Error("Internal Server Error"));
  }
};
