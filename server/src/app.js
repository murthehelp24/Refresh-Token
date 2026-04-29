import "dotenv/config";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todos.route.js";

const app = express();
app.use(cors("*"));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

export default app;
