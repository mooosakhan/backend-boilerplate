const { deleteDocument } = require("../../../Helpers");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    await deleteDocument("user", { _id: id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = deleteUser;
