import { Request, Response } from "express";

export class AdController {

    static getAllAds = async (req: Request, res: Response) => {
        res.status(200).json("Ad page access.");
    }
}