import { Router } from "express";
import { authorization, locationValidator, authentication } from "../middleware/index.ts"
import { userRoles } from "../enum/user.enum.ts";
import { locationController } from "../controller/location.controller.ts";


export const locationRouter = Router();

locationRouter.post("/location/create", authentication, authorization([userRoles.ADMIN]) as any, locationValidator, locationController.createlocation);
locationRouter.get("/locations", locationController.getAllCategories);
locationRouter.delete("/location/delete/:id", authentication, authorization([userRoles.ADMIN]), locationController.deletelocation);
locationRouter.get("/location/:id", locationController.getlocationById);
locationRouter.put("/location/update/:id", authentication, authorization([userRoles.ADMIN]), locationController.updatelocation);

