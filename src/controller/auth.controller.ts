import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthLoginFormDto, AuthRegisterFormDto } from 'src/DTO/Auth/auth.form.dto';
import { AuthRegisterFormDtoToEntity } from 'src/mappers/auth.mappers';
import { AuthService } from 'src/services/auth.service';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService : AuthService,
        private readonly jwtService : JwtService
    ){}

    

    @Post('register')
    async register(@Body() body : AuthRegisterFormDto){
        const newUser = AuthRegisterFormDtoToEntity(body)
        await this.authService.create(newUser)

        return
    }

    @Post('login')
    async login(@Body() body : AuthLoginFormDto){
        return this.authService.login(body.username, body.password)

    
    
    }
    
        
    

}
