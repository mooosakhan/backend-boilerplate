import jwt from "jsonwebtoken";
import Config from "../../Config/index.js";
export const tokenVerification = (req, res, next) => {
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
        jwt.verify(token, Config.ADMIN_SECRET || "", async (err, decoded) => {
            if (err) {
                res
                    .status(403)
                    .send({ status: 403, message: "Token Unauthorized!" });
                return;
            }
            req.user = decoded;
            next();
        });
    }
    else {
        res.status(403).send({ status: 403, message: "Token is required" });
    }
};
export const socketTokenVerification = async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error("No token provided!"));
        }
        jwt.verify(token, Config.ADMIN_SECRET || "", async (err, decoded) => {
            if (err) {
                return next(new Error("Invalid or expired token!"));
            }
            socket.user = decoded;
            next();
        });
    }
    catch (error) {
        console.error("Socket Token Verification Error:", error);
        return next(new Error("Internal Server Error"));
    }
};
//# sourceMappingURL=index.js.map