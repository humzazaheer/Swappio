import { Request, Response } from "express"
import { userRepository } from "../repository/index.ts"
import { UserResponse } from "../dto/response/user.response.ts";

export class UserController {
    static createUser = async (req: Request, res: Response) => {

        const user = await userRepository.createUser(req.body);
        res.status(200).json({ user: new UserResponse(user) });
    }
    static getAllUsers = async (req: Request, res: Response) => {
        const allUsers = await userRepository.getAllUsers();
        res.status(200).json(allUsers);
    }
}