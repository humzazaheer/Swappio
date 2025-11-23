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
        try {
            const adId = Number(req.params.id);

            const { categoryId, locationId, ...rest } = req.body;

            // find ad
            const ad = await adRepository.getAdById(adId);
            if (!ad) {
                return res.status(404).json({ message: "Ad not found" });
            }

            if (categoryId) {
                const category = await categoryRepository.getCategoryById(categoryId);
                if (!category) return res.status(400).json({ message: "Invalid categoryId" });
                ad.category = category;
            }

            if (locationId) {
                const location = await locationRepository.getlocationById(locationId);
                if (!location) return res.status(400).json({ message: "Invalid locationId" });
                ad.location = location;
            }

            // Update other fields
            Object.assign(ad, rest);

            // Save
            const updatedAd = await adRepository.updateAd(adId, ad);

            return res.status(200).json({
                message: "Ad updated successfully",
                data: updatedAd,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error", error });
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