import { IsString, MaxLength, MinLength } from "class-validator"


export class AuthRegisterFormDto{

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    username: string

    @IsString()
    @MaxLength(300)
    email: string


    @IsString()
    @MinLength(3)
    @MaxLength(60)
    password: string

}

export class AuthLoginFormDto{

    
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    username: string



    @IsString()
    @MinLength(3)
    @MaxLength(60)
    password: string

}

