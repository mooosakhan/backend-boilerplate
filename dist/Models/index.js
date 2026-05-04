import mongoose from "mongoose";
import user from "./user/index.js";
mongoose.Promise = global.Promise;
const db = {
    mongoose,
    user,
};
export default db;
//# sourceMappingURL=index.js.map