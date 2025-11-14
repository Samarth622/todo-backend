import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util";

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export default function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: { message: "No access token provided" } });
  }

  const token = auth.split(" ")[1];
  const payload: any = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({ error: { message: "Invalid or expired token" } });
  }

  req.user = {
    id: payload.sub,
    email: payload.email,
  };

  next();
}
