import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todos.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from 'cookie-parser'

const app = express();
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.use(errorHandler)

export default app;
