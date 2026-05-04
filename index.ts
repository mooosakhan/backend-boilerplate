import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import routes from "./Routes/index.js";
import { GlobalRateLimiter } from "./Helpers/RateLimiter/index.js";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));

const isDev = process.env.NODE_ENV === "development";

interface CorsOptions {
  origin: string | string[];
}

const corsOptions: CorsOptions = isDev
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

// MongoDB Connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/fia", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log("✅ MongoDB connected");
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ MongoDB connection error:", err.message);
    }
  }
};

connectDB();

// Health Check Route
app.get("/", (_req: Request, res: Response): void => {
  res.send(new Date().toDateString());
});

// 404 Handler
app.use("*", (_req: Request, res: Response): void => {
  res.status(404).send("Route not found");
});

// Error Handler
app.use(
  (err: Error, _req: Request, res: Response, _next: (err?: Error) => void): void => {
    console.error("❌ Error:", err);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: isDev ? err.message : undefined,
    });
  }
);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
