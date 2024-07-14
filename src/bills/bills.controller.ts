import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
  Put,
  BadRequestException,
} from '@nestjs/common';

import { BillsService } from './bills.service';

import { CreateBillDto } from './dto/create-bill.dto';

import { UpdateBillDto } from './dto/update-bill.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// -------------------------------------------------------------------------

@ApiTags('bills')
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  async create(@Body() createBillDto: CreateBillDto) {
    try {
      return this.billsService.create(createBillDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to create bill: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all bills' })
  @ApiResponse({ status: 200, description: 'Return all bills.' })
  async findAll() {
    try {
      return await this.billsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to retrieve bills: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Bill by ID' })
  @ApiResponse({ status: 200, description: 'Return a single Bill.' })
  @ApiResponse({ status: 404, description: 'Bill not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.billsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to retrieve bill: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing bill' })
  @ApiResponse({ status: 200, description: 'Bill updated.' })
  @ApiResponse({ status: 404, description: 'Bill not found.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    try {
      return await this.billsService.update(id, updateBillDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to update bill: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Bill' })
  @ApiResponse({ status: 200, description: 'Bill deleted.' })
  @ApiResponse({ status: 404, description: 'Bill not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.billsService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: error.message,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to delete bill: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
