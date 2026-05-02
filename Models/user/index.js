const mongoose = require("mongoose");
const userSchema = require("./userSchema")

const user = mongoose.model(
    "User",
    userSchema
);

module.exports = user;