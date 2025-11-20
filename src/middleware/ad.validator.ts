import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { AdDto } from "../dto/ad.dto.ts";

export const adValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adDto = plainToClass(AdDto, req.body); // convert plain object to class instance and also do type conversion
  const errors: ValidationError[] = await validate(adDto); // validate the class instance

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();
    return res.status(400).json({ errors: errorMessages });
  } else {
    next();
  }
};
