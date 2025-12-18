import { IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class PlaceCreateFormDto{

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    street : string

    @IsString()
    @MinLength(1)
    @MaxLength(10)
    number: string

    @IsNumber()
    @Min(4)
    post_code : number

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    city: string

    @IsString()
    @MinLength(3)
    @MaxLength(100)
    country: string
}

export class PlaceUpdateFormDto{

    @IsNumber()
    id: number

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    street?: string

    @IsString()
    @IsOptional()
    @MinLength(1)
    @MaxLength(10)
    number?: string

    @IsNumber()
    @IsOptional()
    post_code?: number

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    city?: string

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    country?: string
}