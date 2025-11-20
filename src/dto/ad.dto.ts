import { IsString, IsNumber, IsArray, IsOptional } from "class-validator";

export class AdDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    categoryId: number;

    @IsNumber()
    locationId: number;

}
