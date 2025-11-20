import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { LocationDto } from "../dto/location.dto.ts";

export const locationValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const locationDto = plainToClass(LocationDto, req.body); // convert plain object to class instance and also do type conversion
  const errors: ValidationError[] = await validate(locationDto); // validate the class instance

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();
    return res.status(400).json({ errors: errorMessages });
  } else {
    next();
  }
};
