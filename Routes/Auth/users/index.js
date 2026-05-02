const {
  searchDocuments,
  updateDocument,
  deleteDocument,
} = require("../../../Helpers");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    const query = search ? { email: { $regex: search, $options: "i" } } : {};

    const users = await searchDocuments("user", query);
    return res.send({ status: 200, users: users });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(404).send({ status: 404, message: "User not found" });
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
    return res.send({ status: 200, user: user[0] });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }
    await deleteDocument("user", { _id: id });
    return res.send({ status: 200 });
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

module.exports = { getUsers, updateUser, deleteUser };
