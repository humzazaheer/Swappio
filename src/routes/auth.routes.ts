import { Router } from "express";
import { AuthController } from "../controller/auth.controller.ts";
import { isUserVerified, isNotUserVerified, loginValidator, authentication, resetPasswordValidator,isAuthenticated } from "../middleware/index.ts"


export const authRouter = Router();

authRouter.post("/auth/verify-account", isAuthenticated, isUserVerified, AuthController.verifyAccount);
authRouter.post("/auth/login", isAuthenticated, loginValidator, isNotUserVerified, AuthController.login);
authRouter.post("/auth/logout", authentication, AuthController.logout);
authRouter.post("/auth/forgot-password", isAuthenticated, AuthController.forgotPassword);
authRouter.post("/auth/verify-otp", isAuthenticated, AuthController.verifyOtp);
authRouter.post("/auth/reset-password", isAuthenticated, resetPasswordValidator, AuthController.resetPassword);
authRouter.post("/auth/resend-otp", isAuthenticated, AuthController.resendOtp);



