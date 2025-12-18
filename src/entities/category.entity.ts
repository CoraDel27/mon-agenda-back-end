import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventsEntity } from "./events.entity";

@Entity({name: 'category'})
export class CategoryEntity{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 60})
    name: string

    @ManyToMany(() => (EventsEntity), event => event.categories)
    events : EventsEntity[]

}