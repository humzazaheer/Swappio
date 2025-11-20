import { Request, Response } from "express";
import { locationRepository } from "../repository/index.ts";
import { LocationEntity } from "../entity/location.entity.ts";

export class locationController {
    static createlocation = async (req: Request, res: Response) => {
        const { name } = req.body;
        const payload = await locationRepository.createlocation({ name } as LocationEntity);
        res.status(200).json({
            mesage: `location "${name}" created successfully.`,
            location: payload,
        });
    }
    static async getAllCategories(req: Request, res: Response) {
        const users = await locationRepository.getAllCategories();
        res.json(users);
    }
    static async deletelocation(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const isDeleted = await locationRepository.deletelocation(userId);
        if (!isDeleted) {
            res.status(404).json({ message: "location not found" });
        } else {
            res.status(200).json({ message: `location is deleted.` });
        }
    }
    static getlocationById = async (req: Request, res: Response) => {
        const { id } = req.params;


        const location = await locationRepository.getlocationById(Number(id));
        if (!location) {
            return res.status(404).json({ message: "location not found!" });
        }
        res
            .status(200)
            .json(location);
    };


    static updatelocation = async (req: Request, res: Response) => {
        const userId = Number(req.params.id);



        const user = await locationRepository.updatelocation(userId, req.body);
        res.status(200).json(user);
    };




}
