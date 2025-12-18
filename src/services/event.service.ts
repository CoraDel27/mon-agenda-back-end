import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemoryStoredFile } from 'nestjs-form-data';
import sharp from 'sharp';
import { CategoryEntity } from 'src/entities/category.entity';
import { EventsEntity } from 'src/entities/events.entity';
import { PlaceEntity } from 'src/entities/place.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { EventAlreadyExistsExistsException, NotFoundExecption } from 'src/shared/models/errors.model';

@Injectable()
export class EventService {

    constructor(
        @InjectRepository(EventsEntity)
        private readonly eventRepository: Repository<EventsEntity>,

        @InjectRepository(PlaceEntity)
        private readonly placeEntity : Repository<PlaceEntity>
        
    ){}

    async getAll(userId: number){
        return await this.eventRepository.find({
            where:{userId},
            relations: {
                place : true,
                categories : true
            }
        })
        
    }

    
    async getById(id: number){

        const event = await this.eventRepository.findOne(
            {where:{id},

            relations: {
                categories : true,
                place : true
            }
        })

        if(!event){
            throw new NotFoundExecption
        }

        return event
    }


    // vérification userId
    async create(newEvent: EventsEntity, imgEvent: MemoryStoredFile){


    // console.log("place -------------------" + newEvent.place.id);
    
        //l'utilisateur peut avoir plusieurs fois le même événement
        // const existEvent = await this.eventRepository.findOne({
        //     where:{name: newEvent.name,
        //            start_date: newEvent.start_date,
        //            end_date: newEvent.end_date,
        //            place: newEvent.place
        //            userdId: newEvent.userId
                   
        //     }
        // }) 

        // if(existEvent){
        //     throw new EventAlreadyExistsExistsException(newEvent.name, newEvent.start_date, newEvent.end_date, newEvent.place)
        // }


        //avant traitement de l'image
        // const eventWithoutImg = await this.eventRepository.save(newEvent)


        //traiter l'image

        // const eventImgUrl = await this.UploadEventImg(eventWithoutImg.id, imgEvent)

        // newEvent.image = eventImgUrl
        
        // sauvegarde l'entité avec l'image modifié

        return this.eventRepository.save(newEvent)

    }
      

    async UploadEventImg(eventId: number, eventImg: MemoryStoredFile) : Promise<string>{
        const processedImage = await sharp(eventImg.buffer)
            .resize(200, 200) // taille de l'image
            .webp({ quality: 50 }) // convertit en format WebP avec une qualité de 50%
            .toBuffer();

    // Définir le chemin où l'image sera enregistrée
        const filePath = `public/images/avatars/${eventId}}.webp`;
        const absolutePath = path.resolve(__dirname, '..', '..', filePath);

    // Vérification et création du répertoire si nécessaire
        await fs.promises.mkdir(path.dirname(absolutePath), { recursive: true });

    // Enregistrer l'image traitée dans le système de fichiers
        await fs.promises.writeFile(absolutePath, processedImage);

        return filePath

    }


    async updateEvent(event: EventsEntity){
        
        const existEvent = await this.eventRepository.findOne({
            where:{id: event.id}
        })

        if(!existEvent){
            throw new NotFoundExecption()
        }

        return this.eventRepository.save(event)
    }


    async updateEventImg(eventId: number, imgEvent: MemoryStoredFile){
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new NotFoundExecption();
    }

    

    
     const imageUrl = await this.UploadEventImg(eventId,imgEvent);

    event.image = imageUrl

    
    await this.eventRepository.save(event);


  }


   async delete(eventId: number){
    const event = await this.eventRepository.findOne({where: {id: eventId}})
    if(!event){
        throw new NotFoundExecption()
    }

    await this.eventRepository.remove(event)

    return event
   }
}



