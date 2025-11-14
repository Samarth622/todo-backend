import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../prisma";
import { createTask, deleteTask, getTaskById, updateTask } from "../services/tasks.service";


export async function createTaskController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const task = await createTask(userId, req.body);
  return res.status(201).json(task);
}


export async function getTasksController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;

  const {
    limit = 10,
    page = 1,
    status,
    search
  } = req.query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = { userId };

  if (status) where.status = status;

  if (search) {
    where.OR = [
      { title: { contains: search as string, mode: "insensitive" } },
      { description: { contains: search as string, mode: "insensitive" } }
    ];
  }

  const [items, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" }
    }),
    prisma.task.count({ where })
  ]);

  return res.json({
    items,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit)
    }
  });
}


export async function getTaskController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const id = Number(req.params.id);

  const task = await getTaskById(id, userId);
  if (!task) return res.status(404).json({ error: { message: "Task not found" } });

  return res.json(task);
}


export async function updateTaskController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const id = Number(req.params.id);

  const updated = await updateTask(id, userId, req.body);

  if (updated.count === 0)
    return res.status(404).json({ error: { message: "Task not found" } });

  return res.json({ message: "Updated successfully" });
}


export async function deleteTaskController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const id = Number(req.params.id);

  const deleted = await deleteTask(id, userId);

  if (deleted.count === 0)
    return res.status(404).json({ error: { message: "Task not found" } });

  return res.status(204).send();
}


export async function toggleTaskStatusController(req: AuthRequest, res: Response) {
  const userId = req.user!.id;
  const id = Number(req.params.id);

  const task = await getTaskById(id, userId);
  if (!task) return res.status(404).json({ error: { message: "Task not found" } });

  let newStatus;

  if (task.status === "TODO") {
    newStatus = "IN_PROGRESS";
  } else if (task.status === "IN_PROGRESS") {
    newStatus = "DONE";
  } else if (task.status === "DONE") {
    newStatus = "TODO";
  }

  await updateTask(id, userId, { status: newStatus });

  return res.json({ message: "Status updated", status: newStatus });
}
