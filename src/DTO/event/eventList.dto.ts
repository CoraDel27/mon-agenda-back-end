import { IsArray, IsDate, IsNumber, IsObject, IsString, MaxLength, MinLength } from "class-validator";
import { CategoryEntity } from "src/entities/category.entity";
import { PlaceEntity } from "src/entities/place.entity";
import { UserEntity } from "src/entities/user.entity";


export class EventListDto{

    @IsNumber()
    id: number

    @IsString()
    @MinLength(3)
    @MaxLength(300)
    name: string
    
    @IsDate()
    start_date: Date
    
    @IsDate()
    end_date: Date
    
    @IsString()
    image: string;


 
    //Place

    @IsNumber()
    place?: PlaceEntity

    //User

    @IsNumber()
    userId?: number
}