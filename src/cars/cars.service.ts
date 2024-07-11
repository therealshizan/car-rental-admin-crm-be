import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateCarDto } from './dto/create-car.dto';

import { Car } from './entities/car.entity';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { generateId } from 'src/common/generate-id';

import { getCurrentUnix } from 'src/lib/date-utils';

import { UpdateCarDto } from './dto/update-car.dto';

// ------------------------------------------------------------------------------------

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<Car>) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      createCarDto.car_id = generateId('car');
      createCarDto.created_at = getCurrentUnix();
      if (createCarDto.car_id && createCarDto.created_at) {
        const createdCar = new this.carModel(createCarDto);
        return await createdCar.save();
      }
      throw new BadRequestException(`Oops. Someting Went Wrong`);
    } catch (error) {
      throw new BadRequestException(`Failed to create car: ${error.message}`);
    }
  }

  async findAll(): Promise<Car[]> {
    try {
      return await this.carModel.find().exec();
    } catch (error) {
      throw new NotFoundException(`Failed to retrieve cars: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Car> {
    try {
      const car = await this.carModel.findOne({ car_id: id }).exec();
      if (!car) {
        throw new NotFoundException('Car not found');
      }
      return car;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Failed to retrieve car: ${error.message}`);
    }
  }

  async update(carId: string, updateCarDto: UpdateCarDto): Promise<Car> {
    try {
      const existingCar = await this.carModel
        .findOneAndUpdate({ car_id: carId }, updateCarDto, { new: true })
        .exec();
      if (!existingCar) {
        throw new NotFoundException('Car not found');
      }
      return existingCar;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update car: ${error.message}`);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.carModel.deleteOne({ car_id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Car not found');
      }
      return { message: `Car with id #${id} has been deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete car: ${error.message}`);
    }
  }
}
