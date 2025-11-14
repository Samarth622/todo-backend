import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export default function validate(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      return res.status(400).json({
        error: {
          message: "Validation Failed",
          details: error.errors,
        },
      });
    }
  };
}
