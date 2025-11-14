import { Request, Response } from "express";
import { createUser, verifyUser } from "../services/auth.service";
import { signAccessToken } from "../utils/jwt.util";
import {
  generateRefreshToken,
  storeRefreshToken,
  verifyRefreshToken,
  revokeToken,
  revokeAll,
} from "../services/token.service";
import dotenv from "dotenv";
import prisma from "../prisma";
import { UnauthorizedError } from "../errors/UnauthorizedError";

dotenv.config();

const COOKIE_NAME = process.env.REFRESH_COOKIE_NAME || "jid";


function setRefreshCookie(res: Response, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/auth/refresh",
  });
}


export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;

  const user = await createUser(email, password, name);

  const accessToken = signAccessToken({ sub: user.id, email: user.email });

  const refreshToken = generateRefreshToken();
  await storeRefreshToken(user.id, refreshToken);

  setRefreshCookie(res, refreshToken);

  return res.status(201).json({
    accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
}


export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await verifyUser(email, password);
  if (!user)
    throw new UnauthorizedError("Invalid email or password");

  const accessToken = signAccessToken({ sub: user.id, email: user.email });

  const refreshToken = generateRefreshToken();
  await storeRefreshToken(user.id, refreshToken);

  setRefreshCookie(res, refreshToken);

  return res.status(200).json({
    accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
}


export async function refresh(req: Request, res: Response) {
  const token = req.cookies[COOKIE_NAME];
  if (!token)
    throw new UnauthorizedError("No refresh token");

  const payload: any = null;

  let userId = null;

  const users = await prisma.user.findMany();
  for (const user of users) {
    const match = await verifyRefreshToken(token, user.id);
    if (match) userId = user.id;
  }

  if (!userId)
    throw new UnauthorizedError("Invalid refresh token");

  const accessToken = signAccessToken({ sub: userId });

  return res.status(200).json({ accessToken });
}


export async function logout(req: Request, res: Response) {
  const token = req.cookies[COOKIE_NAME];

  if (token) {
    const users = await prisma.user.findMany();
    for (const user of users) {
      const match = await verifyRefreshToken(token, user.id);
      if (match) await revokeToken(match.id);
    }
  }

  res.clearCookie(COOKIE_NAME, { path: "/auth/refresh" });

  return res.status(200).json({ message: "Logged out successfully" });
}
