import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Session } from 'src/interfaces/session.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService : JwtService){}
  use(req: Request & { session: Session}, res: Response, next: () => void) {
    
    if(!req.headers.authorization){
      next()
      return
    }

    const [type, token] = req.headers.authorization.split(' ')
    console.log(type, token);
    

    if(type.toLowerCase() !== 'bearer'){
      throw new UnauthorizedException('Invalid type')
    }

    try{
      const session = this.jwtService.verify<Session>(token)
      req.session = session
      
    }
    catch{
      throw new UnauthorizedException('Invalid or expired token')

      
    }
    next()
  }
}
