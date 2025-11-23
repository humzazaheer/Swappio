import { UserEntity } from "../../entity/user.entity.ts";

export class ProfileImageUploadResponseDto {
  filename: string;
  url: string;
  size: number;

  // User info
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  address: string;
  phone: string;
  gender: string;
  profile_image?: string | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    filename: string;
    url: string;
    size: number;
    user: UserEntity;
  }) {
    this.filename = data.filename;
    this.url = data.url;
    this.size = data.size;

    const user = data.user;
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.address = user.address;
    this.phone = user.phone;
    this.gender = user.gender;
    this.profile_image = user.profile_image;
    this.isVerified = user.isVerified;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}


// export class AdImagesUploadResponseDto {
//   success: boolean;
//   message: string;
//   images: string[];
//   adId?: string | number;

//   constructor(
//     success: boolean,
//     message: string,
//     images: string[],
//     adId: string | number
//   ) {
//     this.success = success;
//     this.message = message;
//     this.images = images;
//     this.adId = adId;
//   }
// }

