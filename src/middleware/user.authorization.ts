import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/index.ts";

export const authorization = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(roles);
        // Access the user from request object
        const user = (req as any).user;

        if (!user) {
            return res.status(401).json({ message: "User unauthorized" });
        }

        const getUser = await userRepository.getUserById(user.id);
        if (!getUser || !roles.includes(getUser.role)) {
            return res.status(403).json({ message: "User unauthorized" });
        }

        next();
    };
};
