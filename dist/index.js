import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import routes from "./Routes/index.js";
import { GlobalRateLimiter } from "./Helpers/RateLimiter/index.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));
const isDev = process.env.NODE_ENV === "development";
const corsOptions = isDev
    ? {
        origin: "*",
    }
    : {
        origin: ["http://your.vercel.app"],
    };
app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(GlobalRateLimiter(160, 1));
app.use(helmet());
app.use("/api", routes);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/fia", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB connected");
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("❌ MongoDB connection error:", err.message);
        }
    }
};
connectDB();
app.get("/", (_req, res) => {
    res.send(new Date().toDateString());
});
app.use("*", (_req, res) => {
    res.status(404).send("Route not found");
});
app.use((err, _req, res, _next) => {
    console.error("❌ Error:", err);
    res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: isDev ? err.message : undefined,
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});
export default app;
//# sourceMappingURL=index.js.map