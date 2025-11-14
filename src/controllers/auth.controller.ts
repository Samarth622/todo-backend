import { Request, Response } from "express";
import { createUser, verifyUser } from "../services/auth.service";
import { signAccessToken } from "../utils/jwt.util";

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;

  const user = await createUser(email, password, name);

  const accessToken = signAccessToken({ sub: user.id, email: user.email });

  return res.status(201).json({
    accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await verifyUser(email, password);
  if (!user)
    return res.status(401).json({ error: { message: "Invalid email or password" } });

  const accessToken = signAccessToken({ sub: user.id, email: user.email });

  return res.status(200).json({
    accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
