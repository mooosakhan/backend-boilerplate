require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const routes = require("./Routes");
const { GlobalRateLimiter } = require("./Helpers/RateLimiter");

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
    origin: [
      "http://your.vercel.app",
    ],
  };

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(GlobalRateLimiter(160, 1));
app.use(helmet());

app.use("/api", routes);

mongoose
  .connect(process.env.database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => {
  res.send(new Date().toDateString());
});

app.use("*", (req, res) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 3002;

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});