import { IsNotEmpty, MinLength } from "class-validator";
import { CarsMessagesHelper } from "../helpers/messages.helper";

export class CarsDto {
    @MinLength(2, { message: CarsMessagesHelper.CAR_NAME_NOT_VALID })
    name: string;

    @MinLength(2, { message: CarsMessagesHelper.CAR_BRAND_NOT_VALID })
    brand: string;  

    @MinLength(2, { message: CarsMessagesHelper.CAR_MODEL_NOT_VALID })
    model: string;

    // @IsNotEmpty({message:CarsMessagesHelper.CAR_PHOTO_NOT_FOUND})
    // photo: File;
}