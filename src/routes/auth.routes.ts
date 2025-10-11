import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";

export const authRouter = Router();

// authRouter.post("/auth/register");
authRouter.post("/auth/login", AuthController.login);
// authRouter.post("/auth/forgot-password");
// authRouter.post("/auth/reset-password");
// authRouter.post("/auth/change-password");