const mongoose = require("mongoose");
const studentSchema = require("./studentSchema");

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
