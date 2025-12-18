import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EventsEntity } from "./events.entity";

@Entity({name: 'place'})
export class PlaceEntity{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 100})
    street: string

    @Column({length: 10})
    number : string

    @Column()
    post_code: number

    @Column({length: 100})
    city: string

    @Column({length: 100})
    country: string

    @OneToMany(()=>(EventsEntity), event => event.place)
    events: EventsEntity[]

}
