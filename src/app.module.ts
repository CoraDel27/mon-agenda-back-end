import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth.controller';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { EventsEntity } from './entities/events.entity';
import { PlaceEntity } from './entities/place.entity';
import { CategoryEntity} from './entities/category.entity';
import { NestjsFormDataModule } from 'nestjs-form-data'
import { EventService } from './services/event.service';
import { EventController } from './controller/event.controller';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controller/category.controller';
import { PlaceService } from './services/place.service';
import { PlaceController } from './controller/place.controller';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ['.env.dev', '.env']}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{ expiresIn:'3600s'}
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port:+process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities:[UserEntity, EventsEntity, PlaceEntity, CategoryEntity],
      logging: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([UserEntity, EventsEntity, PlaceEntity, CategoryEntity]),
    NestjsFormDataModule,
  ],
  controllers: [AppController, AuthController, EventController, CategoryController, PlaceController],
  providers: [AppService, AuthService, EventService, CategoryService, PlaceService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
