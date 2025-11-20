import { Router } from "express";
import { adCloseValidator, adValidator, authentication, updateAdValidator } from "../middleware/index.ts";
import { AdController } from "../controller/ad.controller.ts";

export const adRouter = Router();

adRouter.get("/ads", AdController.getAllAds);
adRouter.post("/ad/create", authentication, adValidator, AdController.createAd);
adRouter.put("/ad/update/:id", authentication, updateAdValidator, AdController.updateAd);
adRouter.get("/ad/:id", AdController.getAdById);
adRouter.delete("/ad/delete/:id", authentication, AdController.deleteAd)
adRouter.put("/ad/close/:id", authentication, adCloseValidator, AdController.updateAd)

