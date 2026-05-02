const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../../../Config");
const { insertNewDocument } = require("../../../Helpers");

const signUpUser = async (req, res) => {
  const { email, password, country, city, campus, role, permissions, status } =
    req.body;
  try {
    const User = {
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      country,
      city,
      campus,
      role,
      permissions,
      status,
    };

    const SaveData = await insertNewDocument("user", User);
    if (SaveData) {
      SaveData.password = undefined;
      var token = jwt.sign(
        { id: SaveData._id, email: SaveData.email },
        Config.ADMIN_SECRET
      );

      return res
        .status(200)
        .send({ status: 200, user: SaveData, token: token });
    }
  } catch (e) {
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = signUpUser;
