import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Bookings, BookingsSchema } from './entities/booking.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bookings.name, schema: BookingsSchema },
    ]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
