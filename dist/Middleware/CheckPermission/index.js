export const checkPermission = (permission, capability) => {
    return async (req, res, next) => {
        const user = req.user;
        if (!user) {
            res.status(401).send({
                status: 401,
                message: "Unauthorized.",
            });
            return;
        }
        if (!user.isSuperAdmin) {
            if (!user.role || !user.permissions) {
                res.status(401).send({
                    status: 401,
                    message: "User role or permissions not found.",
                });
                return;
            }
            const permArr = Object.keys(user.permissions);
            const hasPermission = permArr.includes(permission);
            const hasCapability = user.permissions[permission]?.includes(capability);
            if (!hasPermission || !hasCapability) {
                res.status(401).send({
                    status: 401,
                    message: `Permission denied: Required permission '${permission}' with capability '${capability}' not found.`,
                });
                return;
            }
        }
        next();
    };
};
//# sourceMappingURL=index.js.map