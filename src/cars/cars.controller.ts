import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Import decorators
import { Car } from './entities/car.entity';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({ status: 201, description: 'The car has been successfully created.', type: Car })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    try {
      return await this.carsService.create(createCarDto);
    } catch (error) {
      throw new BadRequestException(`Failed to create car: ${error.message}`);
    }
  }

  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ status: 200, description: 'List of all cars.', type: Car, isArray: true })
  @Get()
  async findAll(): Promise<Car[]> {
    try {
      return await this.carsService.findAll();
    } catch (error) {
      throw new NotFoundException(`Failed to retrieve cars: ${error.message}`);
    }
  }

  @ApiOperation({ summary: 'Get car by ID' })
  @ApiResponse({ status: 200, description: 'The found car.', type: Car })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car> {
    try {
      return await this.carsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Car not found: ${error.message}`);
    }
  }

  @ApiOperation({ summary: 'Update car by ID' })
  @ApiResponse({ status: 200, description: 'The updated car.', type: Car })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: CreateCarDto,
  ): Promise<Car> {
    try {
      return await this.carsService.update(id, updateCarDto);
    } catch (error) {
      throw new BadRequestException(`Failed to update car: ${error.message}`);
    }
  }

  @ApiOperation({ summary: 'Delete car by ID' })
  @ApiResponse({ status: 200, description: 'Car has been successfully deleted.', type: () => ({ message: 'Car has been successfully deleted.' }) })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      return await this.carsService.remove(id);
    } catch (error) {
      throw new BadRequestException(`Failed to delete car: ${error.message}`);
    }
  }
}
