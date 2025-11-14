import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/BaseError";

export default function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("🔥 ERROR:", err);

  if (err instanceof BaseError) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  }

  if (err.errors && Array.isArray(err.errors)) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      details: err.errors
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
}
