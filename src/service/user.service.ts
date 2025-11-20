import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity.ts";
import fs from "fs";
import path from "path";

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
  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ["ads"],
      order: { id: "DESC" },
    }

    );
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
  // profile image
  async updateProfileImage(userId: number, fileName: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    // remove old file if exists
    if (user.profile_image) {
      const oldPath = path.join(process.cwd(), "uploads", "profile_images", user.profile_image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    user.profile_image = fileName;
    await this.userRepository.save(user);
    return user;
  }

}