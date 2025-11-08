import { Router } from "express";
import { UserController } from "../controller/user.controller.ts";
import { authorization, userValidator, updateUserValidator, authentication } from "../middleware/index.ts";

export const userRouter = Router();

userRouter.get("/users", authentication, authorization, UserController.getAllUsers);
userRouter.post("/user/create", userValidator, UserController.createUser);
userRouter.put("/user/update/:id", authentication, updateUserValidator, UserController.updateUser);
userRouter.delete("/user/delete/:id", authentication, UserController.deleteUser);
userRouter.get("/user/:id", authentication, UserController.getUserById);