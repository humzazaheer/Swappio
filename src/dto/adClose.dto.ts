import { IsBoolean } from "class-validator";

export class AdCloseDto {

    @IsBoolean()
    isActive: boolean;
}
