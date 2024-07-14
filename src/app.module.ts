import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

import { BookingsModule } from './bookings/bookings.module';

import { CarsModule } from './cars/cars.module';

import { DriversModule } from './drivers/drivers.module';

import { BillsModule } from './bills/bills.module';

// -------------------------------------------------------------------------

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/car-rental-admin'),
    UsersModule,
    BookingsModule,
    CarsModule,
    DriversModule,
    BillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
