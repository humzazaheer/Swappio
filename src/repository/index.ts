import { AppDataSource } from "../config/data-source.ts";
import { CategoryEntity } from "../entity/category.entity.ts";
import { UserEntity } from "../entity/user.entity.ts";
import { CategoryService } from "../service/category.service.ts";
import { UserSerivce } from "../service/user.service.ts";

export const userRepository = new UserSerivce(AppDataSource.getRepository(UserEntity));

export const categoryRepository = new CategoryService(AppDataSource.getRepository(CategoryEntity));
