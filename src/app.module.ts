import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';

import { BookingsModule } from './bookings/bookings.module';

import { CarsModule } from './cars/cars.module';

import { DriversModule } from './drivers/drivers.module';

import { BillsModule } from './bills/bills.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

// -------------------------------------------------------------------------

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    BookingsModule,
    CarsModule,
    DriversModule,
    BillsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
