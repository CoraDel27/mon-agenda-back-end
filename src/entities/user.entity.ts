import { Role } from "src/shared/enum/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'user'})
export class UserEntity{
    @PrimaryGeneratedColumn('increment')
    id : number

    @Column({length: 50, unique: true})
    username : string

     @Column({length: 300})
     email: string

     @Column({length:60})
     password : string

     @Column({default: Role.User})
     role : Role

     
     

}