import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsOptional, IsString, MaxLength, MinLength} from "class-validator"
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";
import { CategoryEntity } from "src/entities/category.entity";
import { PlaceEntity } from "src/entities/place.entity";


export class EventCreateFormDto{

    @IsString()
    @MinLength(3)
    @MaxLength(300)
    name: string

    @IsDate()
    start_date: Date

    @IsDate()
    end_date: Date

    // @IsFile()
    // @MaxFileSize(5 * 1024 * 1024) // 5 MB
    // @HasMimeType(['image/jpeg', 'image/png', 'image/gif'])
    // image?: MemoryStoredFile;

    @IsString()
    image: string 

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    description: string

    @IsString()
    @MinLength(3)
    @MaxLength(1000)
    note: string

    @IsBoolean()
    ticket_required: boolean

    //Catogery
    @IsArray()
    categories?: CategoryEntity[]

    //Place

   @IsNumber()
    place: PlaceEntity

    @IsNumber()
    userId : number

}

export class EventUpdateFormDto{

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(300)
    name?: string

    @IsDate()
    @IsOptional()
    start_date?: Date

    @IsDate()
    @IsOptional()
    end_date?: Date

    // @IsFile()
    // @IsOptional()
    // @MaxFileSize(5 * 1024 * 1024) // 5 MB
    // @HasMimeType(['image/jpeg', 'image/png', 'image/gif'])
    // image?: MemoryStoredFile;

    @IsString()
    image: string

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(1000)
    note?: string

    //Catogery
    @IsArray()
    @IsOptional()
    categories? : CategoryEntity[]

    //Place

    @IsObject()
    place: PlaceEntity

    


}