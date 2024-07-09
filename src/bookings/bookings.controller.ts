import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'Return all bookings.' })
  async findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiResponse({ status: 200, description: 'Return a single booking.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing booking' })
  @ApiResponse({ status: 200, description: 'Booking updated.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiResponse({ status: 200, description: 'Booking deleted.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
