//DTO -> Entities

import { EventDto } from "src/DTO/event/event.dto";
import { EventCreateFormDto, EventUpdateFormDto } from "src/DTO/event/event.form.dto";
import { EventListDto } from "src/DTO/event/eventList.dto";
import { EventsEntity } from "src/entities/events.entity";


export function EventCreateFormDtoToEventsEntity(dto: EventCreateFormDto):  EventsEntity{

const event = new EventsEntity()

event.name = dto.name
event.start_date = dto.start_date
event.end_date = dto.end_date
event.description = dto.description
event.note = dto.note
event.categories = dto.categories
event.place = dto.place
event.image = dto.image || "image"
event.ticket_required = dto.ticket_required
event.userId = dto.userId
    
return event

}



export function EventUpdateFormDtoToEventsEntity(dto: EventUpdateFormDto, event: EventsEntity): EventsEntity{

    if(dto.name !== undefined){
        event.name = dto.name 
      }

    if(dto.start_date !== undefined){
         event.start_date = dto.start_date
     }

     if(dto.end_date !== undefined){
         event.end_date = dto.end_date
     }

     if(dto.description !==undefined){
         event.description = dto.description
     }

     if(dto.note !== undefined){
         event.note = dto.note
     }

     if(dto.image !== undefined){
        event.image = dto.image
     }
     if(dto.categories !== undefined){
        event.categories = dto.categories
     }

     if(dto.place !== undefined){
        event.place = dto.place
     }

     return event
}

//Entity=>DTO

export function EntityToEventDto(event : EventsEntity): EventDto{

    console.log(event)
    return{
        id: event.id,
        name: event.name,
        start_date: event.start_date,
        end_date: event.end_date,
        description: event.description,
        note: event.note,
        image: event.image,
        ticket_required: event.ticket_required,
        categories: event.categories,
        place: event.place,
        userId : event.userId
        
        


    }
}

export function EntityToEventListDto(event: EventsEntity): EventListDto{
    return{
        id: event.id,
        name: event.name,
        start_date: event.start_date,
        end_date: event.end_date,
        image: event.image,
        place: event.place,
        userId: event.userId
        
    }
}





