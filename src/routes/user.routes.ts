import { Router } from "express";
import { UserController } from "../controller/user.controller.ts";
import { userValidator } from "../middleware/user.validator.ts";

export const userRouter = Router();

userRouter.get("/users", UserController.getAllUsers);
userRouter.post("/user/create", userValidator, UserController.createUser);
userRouter.put("/user/update/:id", userValidator, UserController.updateUser);
userRouter.delete("/user/delete/:id", UserController.deleteUser);