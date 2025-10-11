import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber
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

  @IsNumber()
  phone: number;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  profile_image: string;
}
