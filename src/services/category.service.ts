import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { CategoryAlreadyExistsException, NotFoundExecption } from 'src/shared/models/errors.model';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryEntity)
        private readonly categoryRepository : Repository<CategoryEntity>){}


    async getAll(){
        return this.categoryRepository.find()
    }

    async getById(id: number){
        const category = await this.categoryRepository.findOne({where: {id}})

        if(!category){
            throw new NotFoundExecption()
        }

        return category
    }

    async create(newCategory: CategoryEntity){
        
        const existCatetogy = await this.categoryRepository.findOne({where:{name: newCategory.name}})

        if(existCatetogy){
            throw new CategoryAlreadyExistsException(newCategory.name)
        }

        return this.categoryRepository.save(newCategory)
    }

    async update(category: CategoryEntity){
        return this.categoryRepository.save(category)
    }

    async delete(id: number){
        const existCatetogy = await this.categoryRepository.findOne({where:{id}})

        if(!existCatetogy){
            throw new NotFoundExecption()
        }

        await this.categoryRepository.remove(existCatetogy)
        return existCatetogy
    }

    
}
