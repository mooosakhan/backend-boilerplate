import dotenv from "dotenv";

dotenv.config();

interface Config {
  HOST: string;
  PORT: number;
  dbName: string;
  dbPassword: string;
  ADMIN_SECRET: string | undefined;
  STUDENT_SECRET: string | undefined;
  JWT_SECRET: string | undefined;
  AWS_LAMBDA_SECRET: string | undefined;
}

const config: Config = {
  HOST: "localhost",
  PORT: 3000,
  dbName: "yourdbname",
  dbPassword: "yoursecretpassword",
  ADMIN_SECRET: process.env.ADMIN_SECRET,
  STUDENT_SECRET: process.env.STUDENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_LAMBDA_SECRET: process.env.AWS_LAMBDA_SECRET,
};

export default config;
