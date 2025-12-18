import { PlaceEntity } from "src/entities/place.entity";

export class UserAlreadyExistsException extends Error{
    constructor(username : string){
        super(`Username ${username} already exists`);
        this.name= 'UserAlreadyExistsException'
    }
}

export class InvalidLoginException extends Error{
    constructor(){
        super('Invalid login')
        this.name = 'InvalidLoginException'
    }
}

export class CategoryAlreadyExistsException extends Error{
    constructor(name: string){
        super(`Category ${name} already exists`)
        this.name = 'CategoryAlreadyException'
    }
}

export class NotFoundExecption extends Error{
    constructor(){
        super('Not found')
        this.name = 'NotFoundExecption'
    }
}

export class PlaceAlreadyExistsException extends Error{
    constructor(street: string, number: string, post_code: number, city: string, country: string){
        super(`${street} ${number} ${post_code} ${city} ${country} already exists`)
        this.name = 'PlaceAlreadyExistsException'
    }
}

export class EventAlreadyExistsExistsException extends Error{
    constructor(name: string, start_date: Date, end_date: Date, place: PlaceEntity){
        super(`${name} ${start_date}-${end_date} ${place}`)
        this.name= 'EventAlreadyExistsExistsException'
    }
    
        
}

