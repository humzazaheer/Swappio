import { Router } from "express";
import { authentication } from "../middleware/user.authentication.ts";
import { authorization } from "../middleware/user.authorization.ts";
import { AdController } from "../controller/ad.controller.ts";

export const adRouter = Router();

adRouter.get("/ads", authentication, authorization, AdController.getAllAds);

