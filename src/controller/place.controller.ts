import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PlaceCreateFormDto, PlaceUpdateFormDto } from 'src/DTO/place/place.form.dto';
import { EntityToPlaceDto, PlaceCreateFormDtoToEntity, PlaceUpdateFormDtoToEntity } from 'src/mappers/place.mappers';
import { PlaceService } from 'src/services/place.service';

@Controller('place')
export class PlaceController {
    
    constructor(private readonly placeService: PlaceService){}

    @Get('')
    async getAll(){
        const places = await this.placeService.getAll()
        return places.map(EntityToPlaceDto)
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number){
        const place = await this.placeService.getById(id)
        return EntityToPlaceDto(place)
    }

    @Post('')
    async create(@Body() body: PlaceCreateFormDto){
        const entity = PlaceCreateFormDtoToEntity(body)
        const newEntity = await this.placeService.create(entity)
        return EntityToPlaceDto(newEntity)
    }

    @Put(':id')
    async update(@Param('id',ParseIntPipe) id: number, @Body() body : PlaceUpdateFormDto){
        const oldEntity = await this.placeService.getById(id)
        const entity = PlaceUpdateFormDtoToEntity(body, oldEntity)
        const newEntity = await this.placeService.update(entity)
        return EntityToPlaceDto(newEntity)
    }

    @Delete(':id')
    async deleteCategory(@Param('id', ParseIntPipe) id: number){
    
        const entity = await this.placeService.delete(id)  
        return EntityToPlaceDto(entity)
    }



}
