import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CategoryCreateFormDto{

    @IsString()
    @MinLength(3)
    @MaxLength(60)
    name: string
}

export class CatogeryUpdateFormDto{
    @IsNumber()
    id: number

    @IsString()
    @MinLength(3)
    @MaxLength(60)
    name: string
    
}