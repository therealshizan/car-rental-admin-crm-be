import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateBillDto } from './dto/create-bill.dto';

import { UpdateBillDto } from './dto/update-bill.dto';

import { InjectModel } from '@nestjs/mongoose';

import { Bill } from './entities/bill.entity';

import { Model } from 'mongoose';

import { generateId } from 'src/common/generate-id';

// ----------------------------------------------------------------------

@Injectable()
export class BillsService {
  constructor(
    @InjectModel(Bill.name) private readonly billsModel: Model<Bill>,
  ) {}

  async create(createBillDto: CreateBillDto) {
    try {
      createBillDto.id = generateId('bill');
      const createBill = new this.billsModel(createBillDto);
      return createBill.save();
    } catch (error) {
      throw new Error(`Failed to create bill: ${error.message}`);
    }
  }

  async findAll(): Promise<Bill[]> {
    try {
      return await this.billsModel.find().exec();
    } catch (error) {
      throw new Error(`Failed to retrieve bills: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Bill> {
    try {
      const bill = await this.billsModel.findOne({ id }).exec();
      if (!bill) {
        throw new NotFoundException('Bill not found');
      }
      return bill;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to retrieve bill: ${error.message}`);
    }
  }

  async update(id: string, updateBillDto: UpdateBillDto): Promise<Bill> {
    try {
      if (updateBillDto.id || updateBillDto.created_at) {
        throw new BadRequestException("You can't edit id and created_at");
      }
      const updatedBill = await this.billsModel
        .findOneAndUpdate({ id }, updateBillDto, { new: true })
        .exec();
      if (!updatedBill) {
        throw new NotFoundException('Bill not found');
      }
      return updatedBill;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new Error(`Failed to update Bill: ${error.message}`);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.billsModel.deleteOne({ id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Bill not found');
      }
      return { message: `Bill with id #${id} has been deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete Bill: ${error.message}`);
    }
  }
}
