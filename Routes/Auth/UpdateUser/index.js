const { searchDocuments, updateDocument } = require("../../../Helpers");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    const payload = req.body;
    if (payload.password) {
      payload.password = bcrypt.hashSync(
        payload.password,
        bcrypt.genSaltSync(10)
      );
    }
    await updateDocument("user", { _id: id }, payload);
    const user = await searchDocuments("user", { _id: id });
    return res.status(200).json({ user: user[0] });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = updateUser;
