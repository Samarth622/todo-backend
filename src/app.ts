import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import prisma from "./prisma";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/tasks.routes";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middleware/error.middleware";

const app = express();
app.use(json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(errorMiddleware);

app.get("/", (req, res) => res.send("Hello from TypeScript + Prisma!"));

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

export default app;
