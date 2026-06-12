import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));

app.get('/paddocks', async (req, res) => {
  const paddocks = await prisma.paddock.findMany({
    include: { sheep: true },
  });
  res.json(paddocks);
});

app.get('/sheep', async (req, res) => {
  const sheep = await prisma.sheep.findMany({
    include: { paddock: true },
  });
  res.json(sheep);
});

app.get('/movements', async (req, res) => {
  const movements = await prisma.movement.findMany({
    include: { sheep: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(movements);
});

app.post('/paddocks', async (req, res) => {
  const { name, size, farmId } = req.body;
  const paddock = await prisma.paddock.create({
    data: { name, size, farmId },
  });
  res.status(201).json(paddock);
});

app.post('/sheep', async (req, res) => {
  const { tag, breed, weight, paddockId } = req.body;
  const sheep = await prisma.sheep.create({
    data: { tag, breed, weight: weight ? Number(weight) : null, paddockId },
  });
  res.status(201).json(sheep);
});

app.post('/movements', async (req, res) => {
  const { sheepId, fromPaddock, toPaddock } = req.body;
  const movement = await prisma.movement.create({
    data: { sheepId, fromPaddock, toPaddock },
  });
  res.status(201).json(movement);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
