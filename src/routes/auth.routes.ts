import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";
import { isUserVerified } from "../middleware/user.verified.ts";
import { isNotUserVerified } from "../middleware/user.notVerfeid.ts";

export const authRouter = Router();

// authRouter.post("/auth/register");
authRouter.post("/auth/login", isNotUserVerified, AuthController.login);
authRouter.post("/auth/verify-account", isUserVerified, AuthController.verifyAccount);

// authRouter.post("/auth/forgot-password");
// authRouter.post("/auth/reset-password");
// authRouter.post("/auth/change-password");