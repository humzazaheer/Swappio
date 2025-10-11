import {
  IsString,
  IsEmail
} from "class-validator";

export class UserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  address: string;

  @IsString()
  phone: number;

  @IsString()
  gender: string;

  @IsString()
  profile_image: string;
}
