import { NextFunction, Request, response, Response } from "express";
import { userRepository } from "../repository/index.ts";
import { userRoles } from "../enum/user.enum.ts";

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['user'] as any;

  
    const getUser = await userRepository.getUserById(userId.id);
    if (userRoles.ADMIN === getUser?.role || userRoles.USER === getUser?.role) {
        console.log(getUser);
        next();
    } else {
        return res.status(401).json({ message: "User unauthorized" });

    }



} 