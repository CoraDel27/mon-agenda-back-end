import { CategoryDto } from "src/DTO/Category/category.dto";
import { CategoryCreateFormDto, CatogeryUpdateFormDto } from "src/DTO/Category/category.form";
import { CategoryEntity } from "src/entities/category.entity";


//DTO => Entity

export function CategoryCreateFormDtoToEntity(dto: CategoryCreateFormDto): CategoryEntity{

    const category = new CategoryEntity()

    category.name = dto.name


    return category
}

export function CatogeryUpdateFormDtoToEntity(dto: CatogeryUpdateFormDto, category: CategoryEntity): CategoryEntity{

    category.name= dto.name

    return category
}

//Entity => DTO

export function EntityToCategoryDto(category: CategoryEntity): CategoryDto{

    return {

        id: category.id,
        name: category.name,
        events: category.events
    }
}

