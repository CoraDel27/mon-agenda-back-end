import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import { EventCreateFormDto, EventUpdateFormDto } from 'src/DTO/event/event.form.dto';
import { EntityToEventDto, EntityToEventListDto, EventCreateFormDtoToEventsEntity, EventUpdateFormDtoToEventsEntity } from 'src/mappers/events.mappers';
import { EventService } from 'src/services/event.service';

@Controller('event')
export class EventController {

    constructor(private readonly eventService: EventService
    ){}


    @Get('byuser/:userId')
    async getAll(@Param('userId', ParseIntPipe) userId : number){
        console.log("userId Controller" + userId)
        const events = await this.eventService.getAll(userId)
        return events.map(EntityToEventListDto)
    }
// userId
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number){
        const event = await this.eventService.getById(id)
        return EntityToEventDto(event)
    }

    @Post('')
     async create(@Body() body: EventCreateFormDto, imgEvent: MemoryStoredFile){

         console.log(" BODY controller----------------" + body.ticket_required);
        // console.log("place id" + body.place.id );
        // console.log("place id" + typeof(body.place.id) );        
        
        const entity = EventCreateFormDtoToEventsEntity(body)
        const newEntity = await this.eventService.create(entity, imgEvent)
        return EntityToEventDto(newEntity)
     }  
// userId
@Put(':id')
async update(@Param('id', ParseIntPipe) id: number, @Body() body: EventUpdateFormDto){
    const oldEntity = await this.eventService.getById(id)
    const entity = EventUpdateFormDtoToEventsEntity(body, oldEntity)
    const newEntity = await this.eventService.updateEvent(entity)
    return EntityToEventDto(newEntity)
}

// userId
@Patch(':id')
async updateEventImg(eventId : number, imgEvent: MemoryStoredFile){
    await this.eventService.updateEventImg(eventId, imgEvent)
}

// userId
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        const entity = await this.eventService.delete(id)
        return EntityToEventDto(entity)
    }

 
}
