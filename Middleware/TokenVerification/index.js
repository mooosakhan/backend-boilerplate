const jwt = require("jsonwebtoken");
const Config = require("../../Config");
const { findOne } = require("../../Helpers");

const tokenVerification = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if (!token) {
      return res
        .status(404)
        .send({ status: 404, message: "No token provided!" });
    }
    jwt.verify(token, Config.ADMIN_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .send({ status: 403, message: "Token Unauthorized!" });
      }
      const user = await findOne("user", { _id: decoded.id });
      if (!user) {
        return res
          .status(403)
          .send({ status: 403, message: "Token Unauthorized!" });
      }
      req.user = user;
      next();
    });
  } else {
    // Forbidden
    res.sendStatus(403).send({ status: 403, message: "Token is required" });
  }
};

const socketTokenVerification = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token; // Extract token from socket handshake

    if (!token) {
      return next(new Error("No token provided!"));
    }

    jwt.verify(token, Config.ADMIN_SECRET, async (err, decoded) => {
      if (err) {
        return next(new Error("Invalid or expired token!"));
      }

      const user = await findOne("user", { _id: decoded.id });

      if (!user) {
        return next(new Error("User not found or unauthorized!"));
      }

      socket.user = user; // Attach user data to socket
      next(); // Proceed to next middleware
    });
  } catch (error) {
    console.error("Socket Token Verification Error:", error);
    return next(new Error("Internal Server Error"));
  }
};

module.exports = {
  tokenVerification: tokenVerification,
  socketTokenVerification,
};
