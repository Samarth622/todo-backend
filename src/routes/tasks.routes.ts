import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import validate from "../middleware/validate.middleware";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";

import {
  createTaskController,
  getTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
  toggleTaskStatusController
} from "../controllers/tasks.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasksController);

router.post("/", validate(createTaskSchema), createTaskController);

router.get("/:id", getTaskController);

router.patch("/:id", validate(updateTaskSchema), updateTaskController);

router.delete("/:id", deleteTaskController);

router.post("/:id/toggle", toggleTaskStatusController);

export default router;
