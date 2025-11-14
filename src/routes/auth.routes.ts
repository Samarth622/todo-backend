import { Router } from "express";
import validate from "../middleware/validate.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { register, login, refresh, logout } from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
