import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";

export const authRouter = Router();

// authRouter.post("/auth/register");
authRouter.post("/auth/login", AuthController.login);
authRouter.post("/auth/forgot-password", AuthController.forgotPassword);
authRouter.post("/auth/verify-otp", AuthController.verifyOtp);
authRouter.post("/auth/reset-password", AuthController.resetPassword);
// authRouter.post("/auth/change-password");