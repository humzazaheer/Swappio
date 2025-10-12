import { Router } from "express";
import { UserController } from "../controller/user.controller.ts";
import { userValidator } from "../middleware/user.validator.ts";

export const userRouter = Router();

userRouter.get("/users", UserController.getAllUsers);
userRouter.post("/user", userValidator, UserController.createUser);
// userRouter.put("/user/:id");
// userRouter.delete("/user/:id");