import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import prisma from './prisma';
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(json());

app.get('/', (req, res) => res.send('Hello from TypeScript + Prisma!'));

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use("/auth", authRoutes);

export default app;
