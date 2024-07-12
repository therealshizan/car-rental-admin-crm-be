import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateDriverDto } from './dto/create-driver.dto';

import { UpdateDriverDto } from './dto/update-driver.dto';

import { Driver } from './entities/driver.entity';

import { generateId } from 'src/common/generate-id';

// ------------------------------------------------------------------------------------

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver.name) private readonly driverModel: Model<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      createDriverDto.id = generateId('driver');
      const createdDriver = new this.driverModel(createDriverDto);
      return await createdDriver.save();
    } catch (error) {
      throw new BadRequestException(
        `Failed to create driver: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<Driver[]> {
    try {
      return await this.driverModel.find().exec();
    } catch (error) {
      throw new NotFoundException(
        `Failed to retrieve drivers: ${error.message}`,
      );
    }
  }

  async findOne(id: string): Promise<Driver> {
    try {
      const driver = await this.driverModel.findOne({ id }).exec();
      if (!driver) {
        throw new NotFoundException('Driver not found');
      }
      return driver;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(
        `Failed to retrieve driver: ${error.message}`,
      );
    }
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    try {
      const updatedDriver = await this.driverModel
        .findOneAndUpdate({ id }, updateDriverDto, { new: true })
        .exec();
      if (!updatedDriver) {
        throw new NotFoundException('Driver not found');
      }
      return updatedDriver;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to update driver: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.driverModel.deleteOne({ id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Driver not found');
      }
      return { message: `Driver with id #${id} has been deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to delete driver: ${error.message}`,
      );
    }
  }
}
