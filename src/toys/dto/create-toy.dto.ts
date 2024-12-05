import { IsDefined, IsIn, IsNumber, IsString } from "class-validator";

export class CreateToyDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    @IsIn(["wood", "metal", "plastic", "other"])
    material: string;

    @IsDefined()
    @IsNumber()
    weight: number
}
