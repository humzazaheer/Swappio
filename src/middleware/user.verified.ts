import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/index.ts";

export async function isUserVerified(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const user = await userRepository.getUserByEmail(email);


    if (user && user.isVerified === true) {
        return res.status(400).json({ message: "User is already verified." });
    }
    else {
        next();
    }

}