import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PlaceEntity } from "./place.entity";
import { CategoryEntity} from "./category.entity";
import { IsNumber } from "class-validator";

@Entity({name: "events"})
export class EventsEntity{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 300})
    name: string

    @Column()
    start_date: Date

    @Column()
    end_date: Date

    @Column({nullable : true})
    image: string

    @Column({length: 500})
    description: string

    @Column({length: 1000})
    note: string

    @Column()
    ticket_required: boolean

    @ManyToOne(() => PlaceEntity, (place) => place.events)
    place : PlaceEntity

    @ManyToMany(() => CategoryEntity, (catogery) => catogery.events)
    @JoinTable()
    categories?: CategoryEntity[]

    @Column({nullable: true})
    userId?: number



}