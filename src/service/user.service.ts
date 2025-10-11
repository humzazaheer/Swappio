import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity.ts";
import { Encrypt_Password } from "../helper/password.helper.ts";

export class UserSerivce {
  constructor(private userRepository: Repository<UserEntity>) { }


  async createUser(user: UserEntity): Promise<UserEntity> {
    const payload = {
      ...user,
      password: await Encrypt_Password.hashPassword(user.password),
    };

    const newUser = this.userRepository.create(payload);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email })
  }

}