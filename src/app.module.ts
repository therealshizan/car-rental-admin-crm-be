import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { BookingsModule } from './bookings/bookings.module';
import { CarsModule } from './cars/cars.module';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [UsersModule, DriversModule, BookingsModule, CarsModule, BillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}