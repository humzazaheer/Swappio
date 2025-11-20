import { AppDataSource } from "../config/data-source.ts";
import { AdEntity } from "../entity/ad.entity.ts";
import { CategoryEntity } from "../entity/category.entity.ts";
import { LocationEntity } from "../entity/location.entity.ts";
import { UserEntity } from "../entity/user.entity.ts";
import { adService } from "../service/ad.service.ts";
import { CategoryService } from "../service/category.service.ts";
import { LocationService } from "../service/location.service.ts";
import { UserSerivce } from "../service/user.service.ts";

export const userRepository = new UserSerivce(AppDataSource.getRepository(UserEntity));
export const categoryRepository = new CategoryService(AppDataSource.getRepository(CategoryEntity));
export const locationRepository = new LocationService(AppDataSource.getRepository(LocationEntity));
export const adRepository = new adService(AppDataSource.getRepository(AdEntity));
