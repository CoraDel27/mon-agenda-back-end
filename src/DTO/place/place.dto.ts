import { IsArray, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { EventsEntity } from "src/entities/events.entity"

export class PlaceDto{
        @IsNumber()
        id: number
    
        @IsString()
        @MinLength(3)
        @MaxLength(100)
        street: string
    
        @IsString()
        @MinLength(1)
        @MaxLength(10)
        number: string
    
        @IsNumber()
        post_code: number
    
        @IsString()
        @MinLength(3)
        @MaxLength(100)
        city: string
    
        @IsString()
        @MinLength(3)
        @MaxLength(100)
        country: string

        @IsArray()
        events: EventsEntity[]
}