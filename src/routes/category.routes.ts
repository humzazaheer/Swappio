import { Router } from "express";
import { authorization, categoryValidator, authentication } from "../middleware/index.ts"
import { userRoles } from "../enum/user.enum.ts";
import { CategoryController } from "../controller/category.controller.ts";


export const categoryRouter = Router();

categoryRouter.post("/category/create", authentication, authorization([userRoles.ADMIN]) as any, categoryValidator, CategoryController.createCategory);

categoryRouter.get("/categories", authentication, authorization([userRoles.ADMIN, userRoles.USER]) as any, CategoryController.getAllCategories);
categoryRouter.delete("/category/delete/:id", authentication, authorization([userRoles.ADMIN]), CategoryController.deleteCategory);
categoryRouter.get("/category/:id", authentication,authorization([userRoles.ADMIN]), CategoryController.getCategoryById);
categoryRouter.put("/category/update/:id", authentication,authorization([userRoles.ADMIN]), CategoryController.updateCategory);

