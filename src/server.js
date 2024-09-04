import "dotenv/config";
import express from "express";
import cors from "cors";
import mainRouter from "./routes/mainRoute.js";
import cookieParser from "cookie-parser";
import connectDB from "./database/index.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// route
app.use("/api/v1", mainRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("MONGODB connection FAILED", error);
  });
