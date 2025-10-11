import {
  IsString,
  IsEmail,
  IsOptional,
  Matches
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

  @Matches(/^(?:\+|00)[1-9]\d{1,14}$/, {
    message: 'Phone number must start with + or 00 and be valid',
  })
  phone: string;

  @IsString()
  gender: string;

  @IsString()
  @IsOptional()
  profile_image: string;
}
