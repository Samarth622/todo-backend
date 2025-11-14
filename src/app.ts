import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import prisma from './prisma';

const app = express();
app.use(json());

app.get('/', (req, res) => res.send('Hello from TypeScript + Prisma!'));

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default app;
