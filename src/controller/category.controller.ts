import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryCreateFormDto, CatogeryUpdateFormDto } from 'src/DTO/Category/category.form';
import { CategoryCreateFormDtoToEntity, CatogeryUpdateFormDtoToEntity, EntityToCategoryDto } from 'src/mappers/category.mappers';
import { CategoryService } from 'src/services/category.service';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService){}

    @Get('')
    async getAll(){
        const categories = await this.categoryService.getAll()
        return categories.map(EntityToCategoryDto)
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number){
        const category = await this.categoryService.getById(id)
        return EntityToCategoryDto(category)
    }

    @Post('')
    async create(@Body() body: CategoryCreateFormDto){
        const entity = CategoryCreateFormDtoToEntity(body)
        const newEntity = await this.categoryService.create(entity)
        return EntityToCategoryDto(newEntity)
    }

    @Put(':id')
    async updateCategory(@Param('id', ParseIntPipe) id: number, @Body() body: CatogeryUpdateFormDto){

        const oldEntity = await this.categoryService.getById(id)
        const entity = CatogeryUpdateFormDtoToEntity(body, oldEntity)
        const newEntity = await this.categoryService.update(entity)
        return EntityToCategoryDto(newEntity)



    }

    @Delete(':id')
    async deleteCategory(@Param('id', ParseIntPipe) id: number){

        const entity = await this.categoryService.delete(id)  
        return EntityToCategoryDto(entity)
     }




}
