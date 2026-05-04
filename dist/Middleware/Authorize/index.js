import { ROLES } from "../../Constant/index.js";
export const authorize = (permittedRoles) => {
    return async (req, res, next) => {
        try {
            const user = req.user;
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
            const invalidRoles = rolesToCheck.filter((role) => !rolesArr.includes(role));
            if (invalidRoles.length > 0) {
                res.status(400).json({
                    status: 400,
                    message: `Invalid role(s) specified: ${invalidRoles.join(", ")}.`,
                });
                return;
            }
            if (!user.role || (!user.isAdmin && !rolesToCheck.includes(user.role))) {
                res.status(403).json({
                    status: 403,
                    message: "Unauthorized role.",
                });
                return;
            }
            if (user.isAdmin) {
            }
            next();
        }
        catch (err) {
            console.log("Error authorizing user =>", err);
            res.status(500).json({
                status: 500,
                message: "Internal server error during authorization.",
            });
        }
    };
};
//# sourceMappingURL=index.js.map