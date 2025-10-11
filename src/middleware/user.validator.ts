import { plainToClass } from "class-transformer"
import { UserDto } from "../dto/user.dto.ts"
import { NextFunction, Request, Response } from "express"
import { validate, ValidationError } from "class-validator"


export const userValidator = async (req: Request, res: Response, next: NextFunction) => {
    const userDto = await plainToClass(UserDto, req.body);
    const errors: ValidationError[] = await validate(userDto);
    if (errors.length > 0){
        const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
        return res.status(400).json({errors: errorMessages})
    } else {
        next()
    }
}