import { Router } from "express";
import { authentication } from "../middleware/index.ts";
import { authorization } from "../middleware/index.ts";
import { AdController } from "../controller/ad.controller.ts";

export const adRouter = Router();

adRouter.get("/ads", authentication, authorization, AdController.getAllAds);

