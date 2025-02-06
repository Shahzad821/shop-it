import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./config/db.js";
import productRouter from "./routes/product.js";
import authRouter from "./routes/auth.js";
import paymentRoute from "./routes/payment.js";
import orderRouter from "./routes/order.js";
import errorHandle from "./middleware/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
process.on("uncaughtException", (err) => {
  console.log("Error: ", err);
  console.log("Shutting down server due to uncaught exception");
  process.exit(1);
});
const app = express();
app.use(cors());
const port = process.env.PORT || 4000;

// Connect to the database
ConnectDb();

// Set up Express to use JSON and URL-encoded data
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.urlencoded({ extended: true })); // For URL-encoded data
app.use(cookieParser());
// Set up product routes
app.use("/api/v1", productRouter);
app.use("/api/v1/", authRouter);
app.use("/api/v1/", orderRouter);
app.use("/api/v1/", paymentRoute);
app.use(errorHandle);
if (process.env.NODE_ENV === "PRODUCTION") {
  const staticPath = path.join(__dirname, "../client/dist");
  app.use(express.static(staticPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}
// Start the server
const server = app.listen(port, () => {
  console.log(
    ` Server running on port http://localhost:${port} in ${process.env.NODE_ENV} mode`
  );
});
process.on("unhandledRejection", (err) => {
  console.log("Error: ", err);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
