import mongoose from "mongoose";
import user from "./user/index.js";

mongoose.Promise = global.Promise as any;

interface DB {
  mongoose: typeof mongoose;
  user: any;
}

const db: DB = {
  mongoose,
  user,
};

export default db;
