import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/car-rental-admin'),
    UsersModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
