import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Import decorators

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @ApiOperation({ summary: 'Create a new driver' })
  @ApiResponse({
    status: 201,
    description: 'The driver has been successfully created.',
    type: Driver,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createDriverDto: CreateDriverDto): Promise<Driver> {
    try {
      return await this.driversService.create(createDriverDto);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create driver: ${error.message}`,
      );
    }
  }

  @ApiOperation({ summary: 'Get all drivers' })
  @ApiResponse({
    status: 200,
    description: 'List of all drivers.',
    type: Driver,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Driver[]> {
    try {
      return await this.driversService.findAll();
    } catch (error) {
      throw new NotFoundException(
        `Failed to retrieve drivers: ${error.message}`,
      );
    }
  }

  @ApiOperation({ summary: 'Get driver by ID' })
  @ApiResponse({ status: 200, description: 'The found driver.', type: Driver })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Driver> {
    try {
      return await this.driversService.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Driver not found: ${error.message}`);
    }
  }

  @ApiOperation({ summary: 'Update driver by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated driver.',
    type: Driver,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<Driver> {
    try {
      return await this.driversService.update(id, updateDriverDto);
    } catch (error) {
      throw new BadRequestException(
        `Failed to update driver: ${error.message}`,
      );
    }
  }

  @ApiOperation({ summary: 'Delete driver by ID' })
  @ApiResponse({
    status: 200,
    description: 'Driver has been successfully deleted.',
    type: () => ({ message: 'Driver has been successfully deleted.' }),
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      return await this.driversService.remove(id);
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete driver: ${error.message}`,
      );
    }
  }
}
