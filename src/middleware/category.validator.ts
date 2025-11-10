import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CategoryDto } from "../dto/category.dto.ts";

export const categoryValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryDto = plainToClass(CategoryDto, req.body); // convert plain object to class instance and also do type conversion
  const errors: ValidationError[] = await validate(categoryDto); // validate the class instance

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();
    return res.status(400).json({ errors: errorMessages });
  } else {
    next();
  }
};
