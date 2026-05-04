import express from "express";
import auth from "./Auth/index.js";
const router = express.Router();
router.use("/auth", auth);
export default router;
//# sourceMappingURL=index.js.map