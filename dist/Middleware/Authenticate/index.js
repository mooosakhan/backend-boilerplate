import jwt from "jsonwebtoken";
import Config from "../../Config/index.js";
const JWT_SECRETS = [
    Config.ADMIN_SECRET,
    Config.STUDENT_SECRET,
];
export const authenticate = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        let user;
        let isLegacyToken = false;
        if (!token) {
            res.status(401).json({ status: 401, message: "Unauthorized." });
            return;
        }
        jwt.verify(token, Config.JWT_SECRET || "", (err, decoded) => {
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
                        user = payload;
                        if (secret === Config.ADMIN_SECRET) {
                            user.isAdmin = true;
                        }
                        const new_token = jwt.sign(payload, Config.JWT_SECRET || "");
                        res.setHeader("Update-Token", new_token);
                        res.setHeader("Access-Control-Expose-Headers", "Update-Token");
                        break;
                    }
                }
                catch (err) {
                }
            }
        }
        if (!user) {
            res.status(401).json({ status: 401, message: "Token Unauthorized." });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error during authentication.",
        });
    }
};
//# sourceMappingURL=index.js.map