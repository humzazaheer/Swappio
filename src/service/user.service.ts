import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity.ts";
import { Encrypt_Password } from "../helper/password.helper.ts";

export class UserSerivce {
  constructor(private userRepository: Repository<UserEntity>) { }


  async createUser(user: UserEntity): Promise<UserEntity> {

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }
  async updateUser(id: number, userData: Partial<UserEntity>): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;

    this.userRepository.merge(user, userData);
    await this.userRepository.save(user);
    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async deleteUser(id: number): Promise<boolean> {
    const deletedUser = await this.userRepository.delete(id);
    return deletedUser.affected !== 0
  }


}