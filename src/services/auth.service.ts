import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InvalidLoginException, UserAlreadyExistsException } from 'src/shared/models/errors.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService : JwtService
    ){}

    async create(newUser: UserEntity){
        const existingUsername = await this.userRepository.findOne({
            where:{
                username: newUser.username
            }
        })

        if(existingUsername){
            throw new UserAlreadyExistsException(newUser.username)

        }

        newUser.password = await bcrypt.hash(newUser.password, 10);

        return this.userRepository.save(newUser)

    }

    async login(username: string, password: string){

        const existingUsername = await this.userRepository.findOne({
            where:{
                username: username
            }
        })

        if(!existingUsername){
           throw new InvalidLoginException()

        }

        const isValidPassword = await bcrypt.compare(password, existingUsername.password)

        if(!isValidPassword){
            throw new InvalidLoginException
        }


        return this.generateUserTonkens(existingUsername.id)


    }

    async generateUserTonkens(userId : number){
        const payload = { sub: userId}

        const accessToken = this.jwtService.sign(payload)

        return {
            accessToken,
        }
    }

    


    
}
