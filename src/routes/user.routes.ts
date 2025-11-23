import { Router } from "express";
import { UserController } from "../controller/user.controller.ts";
import { authorization, userValidator, updateUserValidator, authentication } from "../middleware/index.ts";
import { userRoles } from "../enum/user.enum.ts";
// import { uploadFile } from "../helper/fileUpload.helper.ts";

export const userRouter = Router();

userRouter.get("/users", authentication, authorization([userRoles.ADMIN, userRoles.USER]) as any, UserController.getAllUsers);
userRouter.post("/user/create", userValidator, UserController.createUser);
userRouter.put("/user/update/:id", authentication, updateUserValidator, UserController.updateUser);
userRouter.delete("/user/delete/:id", authentication, authorization([userRoles.ADMIN, userRoles.USER]), UserController.deleteUser);
userRouter.get("/user/profile", authentication, authorization([userRoles.ADMIN, userRoles.USER]) as any, UserController.userProfile);
userRouter.get("/user/:id", authentication, UserController.getUserById);

