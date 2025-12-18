//DTO => Entity

import { PlaceDto } from "src/DTO/place/place.dto";
import { PlaceCreateFormDto, PlaceUpdateFormDto } from "src/DTO/place/place.form.dto";
import { PlaceEntity } from "src/entities/place.entity";
import { Entity } from "typeorm";

export function PlaceCreateFormDtoToEntity(dto: PlaceCreateFormDto): PlaceEntity{

    const place = new PlaceEntity()

    place.street = dto.street
    place.number = dto.number
    place.post_code = dto.post_code
    place.city = dto.city
    place.country = dto.country

    return place
}

export function PlaceUpdateFormDtoToEntity(dto: PlaceUpdateFormDto, place: PlaceEntity){

    if(dto.street !== undefined){
        place.street = dto.street
    }
    if(dto.number !== undefined){
        place.number = dto.number
    }
    if(dto.post_code !== undefined){
        place.post_code = dto.post_code
    }
    if(dto.city !== undefined){
         place.city = dto.city
    }
    if(dto.country !== undefined){
        place.country = dto.country
    }
   

    return place
   
}



//Entity => DTO

export function EntityToPlaceDto(place : PlaceEntity): PlaceDto{

    return{
        id: place.id,
        street: place.street,
        number: place.number,
        post_code: place.post_code,
        city: place.city,
        country: place.country,
        events: place.events
    }
}