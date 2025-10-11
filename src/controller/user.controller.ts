import { AppDataSource } from "../config/data-source.ts"
import { UserEntity } from "../entity/user.entity.ts"
import { Request, Response } from "express"

export class UserController {
    static createUser = async (req: Request, res: Response) => {
        const newuser = await AppDataSource.getRepository(UserEntity).create(req.body)
        const saveuser = await AppDataSource.getRepository(UserEntity).save(newuser)
        res.status(200).json(saveuser)
    }
}