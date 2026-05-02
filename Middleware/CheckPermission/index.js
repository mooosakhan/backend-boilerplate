const checkPermission = (permission, capability) => {
  return async (req, res, next) => {
    const { user } = req;

    if (!user) {
      return res.status(401).send({
        status: 401,
        message: "Unauthorized.",
      });
    }

    if (!user.isSuperAdmin) {
      if (!user.role || !user.permissions) {
        return res.status(401).send({
          status: 401,
          message: "User role or permissions not found.",
        });
      }

      const permArr = Object.keys(user.permissions);
      const hasPermission = permArr.includes(permission);
      const hasCapability = user.permissions[permission]?.includes(capability);

      if (!hasPermission || !hasCapability) {
        return res.status(401).send({
          status: 401,
          message: `Permission denied: Required permission '${permission}' with capability '${capability}' not found.`,
        });
      }
    }
    next();
  };
};

module.exports = { checkPermission };
