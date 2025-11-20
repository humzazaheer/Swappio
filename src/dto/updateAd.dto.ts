import { IsString, IsNumber, IsArray, IsOptional } from "class-validator";

export class UpdateAdDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    categoryId: number;

    @IsOptional()
    @IsNumber()
    locationId: number;

}
