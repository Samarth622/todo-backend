import crypto from "crypto";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}


export async function hashToken(token: string) {
  return bcrypt.hash(token, SALT_ROUNDS);
}


export async function storeRefreshToken(userId: number, token: string) {
  const tokenHash = await hashToken(token);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  return prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });
}


export async function verifyRefreshToken(token: string, userId: number) {
  const tokens = await prisma.refreshToken.findMany({
    where: { userId, revoked: false },
  });

  for (const stored of tokens) {
    const match = await bcrypt.compare(token, stored.tokenHash);
    if (match) return stored;
  }

  return null;
}


export async function revokeToken(id: number) {
  return prisma.refreshToken.update({
    where: { id },
    data: { revoked: true },
  });
}


export async function revokeAll(userId: number) {
  return prisma.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
}
