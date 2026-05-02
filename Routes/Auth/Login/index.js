const bcrypt = require("bcryptjs");
const Config = require("../../../Config");
const jwt = require("jsonwebtoken");
const { findOne } = require("../../../Helpers");

const login = async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await findOne("user", { email });

    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "User does not exist." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid credentials." });
    }

    if (user.status !== "active") {
      return res
        .status(403)
        .json({ status: 403, message: "User account is Inactive." });
    }

    var token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        country: user.country,
        city: user.city,
        campus: user.campus,
        isSuperAdmin: user.isSuperAdmin,
        permissions: user.permissions,
        is_dev: user.is_dev || false,
        isAdmin: true,
      },
      Config.ADMIN_SECRET
    );
    return res.status(200).json({ userInformation: user, token });
  } catch (err) {
    console.error("Error in admin login:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = login;
