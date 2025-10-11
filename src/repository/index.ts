import { AppDataSource } from "../config/data-source.ts";
import { UserEntity } from "../entity/user.entity.ts";
import { UserSerivce } from "../service/user.service.ts";

export const userRepository = new UserSerivce(AppDataSource.getRepository(UserEntity));
