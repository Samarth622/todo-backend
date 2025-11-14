import prisma from "../prisma";

export function createTask(userId: number, data: any) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status || "TODO",
      userId,
    },
  });
}

export function getTaskById(id: number, userId: number) {
  return prisma.task.findFirst({
    where: { id, userId },
  });
}

export function updateTask(id: number, userId: number, data: any) {
  return prisma.task.updateMany({
    where: { id, userId },
    data
  });
}

export function deleteTask(id: number, userId: number) {
  return prisma.task.deleteMany({
    where: { id, userId },
  });
}
