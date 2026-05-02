require("dotenv").config();

module.exports = {
  HOST: "localhost",
  PORT: 3000,
  dbName: "yourdbname",
  dbPassword: "yoursecretpassword",
  ADMIN_SECRET: process.env.ADMIN_SECRET,
  STUDENT_SECRET: process.env.STUDENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_LAMBDA_SECRET: process.env.AWS_LAMBDA_SECRET,
};
