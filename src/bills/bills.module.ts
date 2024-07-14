import { Module } from '@nestjs/common';

import { BillsService } from './bills.service';

import { BillsController } from './bills.controller';

import { MongooseModule } from '@nestjs/mongoose';

import { Bill, BillSchema } from './entities/bill.entity';

// ---------------------------------------------------------

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
  ],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
