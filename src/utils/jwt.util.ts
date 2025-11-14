import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function signAccessToken(payload: object) {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
  } catch {
    return null;
  }
}
