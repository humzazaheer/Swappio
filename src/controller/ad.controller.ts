import { Request, Response } from "express";
import { adRepository, categoryRepository, locationRepository, userRepository } from "../repository/index.ts";

export class AdController {

    static getAllAds = async (req: Request, res: Response) => {
        const { query } = req;
        let whereParams = {};
        if (query?.locationId) {
            const locationId = Number(query.locationId);
            whereParams = { ...whereParams, location: { id: locationId } };
        }
        if (query?.categoryId) {
            const categoryId = Number(query.categoryId);
            whereParams = { ...whereParams, category: { id: categoryId } };
        }
        if (query?.userId) {
            const userId = Number(query.userId);
            whereParams = { ...whereParams, user: { id: userId } };
        }
        if (query?.id) {
            const id = Number(query.id);
            whereParams = { ...whereParams, id: id };
        }

        const ads = await adRepository.getAllAds(whereParams, 0, 100);


        res.status(200).json(ads);
    }
    static createAd = async (req: Request, res: Response) => {

        const { userId, categoryId, locationId } = req.body;
        const user = await userRepository.getUserById(userId);
        const category = await categoryRepository.getCategoryById(categoryId);
        const location = await locationRepository.getlocationById(locationId);

        const ad = await adRepository.createAd({
            ...req.body,
            user,
            location,
            category,

        });


        res.status(200).json({
            mesasage: "Ad created successfully",
            data: { ad }
        });
    }
      static getAdById = async (req: Request, res: Response) => {
            const { id } = req.params;
    
    
            const ad = await adRepository.getAdById(Number(id));
            if (!ad) {
                return res.status(404).json({ message: "Ad not found!" });
            }
            res
                .status(200)
            .json(ad);
        };
    
    static async updateAd(req: Request, res: Response) {
        const adId = Number(req.params.id);
        const ad = await adRepository.updateAd(
            adId,
            req.body
        );
        if (ad) {

            res.status(200).json({ message: "Ad updated successfully", data: ad });
        } else {
            res.status(404).json({ message: "Ad not found" });
        }

    }
    static async deleteAd(req: Request, res: Response) {
        const adId = Number(req.params.id);
        const isDeleted = await adRepository.deleteAd(adId);
        if (!isDeleted) {
            res.status(404).json({ message: "Ad not found" });
        } else {
            res.status(200).json({ message: "Ad deleted successfully" });
        }
    }

}