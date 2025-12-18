import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceEntity } from 'src/entities/place.entity';
import { NotFoundExecption, PlaceAlreadyExistsException } from 'src/shared/models/errors.model';
import { Repository } from 'typeorm';

@Injectable()
export class PlaceService {

    constructor(@InjectRepository(PlaceEntity)
        private readonly placeRepository : Repository<PlaceEntity>){}


    async getAll(){
        return this.placeRepository.find()
    }

    async getById(id: number){
        const place = await this.placeRepository.findOne({
            where: {id}
        })

        if(!place){
            throw new NotFoundExecption()
        }

        return place
    }

    async create(newPlace: PlaceEntity){
        const existPlace = await this.placeRepository.findOne({
            where:{street: newPlace.street,
                   number: newPlace.number,
                   post_code: newPlace.post_code,
                   city: newPlace.city,
                   country: newPlace.country
            }
        })

        if(existPlace){
            throw new PlaceAlreadyExistsException(newPlace.street, newPlace.number, newPlace.post_code, newPlace.city, newPlace.country)
        }

        return this.placeRepository.save(newPlace)
    }

    async update(place: PlaceEntity){
        return this.placeRepository.save(place)
    }

    async delete(id: number){
        const existsPlace = await this.placeRepository.findOne({where: {id}})

        if(!existsPlace){
            throw new NotFoundExecption()
        }

        await this.placeRepository.remove(existsPlace)
        return existsPlace

    }
}
