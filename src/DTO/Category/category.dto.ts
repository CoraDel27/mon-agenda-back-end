import { IsArray, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { EventsEntity } from "src/entities/events.entity"

export class CategoryDto{

        @IsNumber()
        id: number
    
        @IsString()
        @MinLength(3)
        @MaxLength(60)
        name: string


        @IsArray()
        events: EventsEntity[]
}