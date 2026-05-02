const express = require("express");
const auth = require("./Auth");
const student = require("./Student");

const router = express.Router();

router.use("/auth", auth);
router.use("/student", student);

module.exports = router;
