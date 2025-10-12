import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/index.ts";

export async function isNotUserVerified(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const user = await userRepository.getUserByEmail(email);


    if (user && user.isVerified === false) {
        return res.status(400).json({ message: "Please verify your account to login." });
    }
    else {
        next();
    }

}