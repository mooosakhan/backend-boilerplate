const { searchDocuments } = require("../../../Helpers");

const getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    const query = search ? { email: { $regex: search, $options: "i" } } : {};

    const users = await searchDocuments("user", query);
    return res.status(200).json({ users: users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = getUsers;
