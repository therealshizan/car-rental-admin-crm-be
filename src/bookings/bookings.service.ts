import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookings } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { generateId } from 'src/common/generate-id';
import { getCurrentUnix } from 'src/lib/date-utils';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Bookings.name) private readonly bookingsModel: Model<Bookings>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Bookings> {
    try {
      createBookingDto.booking_id = generateId('booking');
      createBookingDto.created_at = getCurrentUnix();
      const createdBooking = new this.bookingsModel(createBookingDto);
      return createdBooking.save();
    } catch (error) {
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  async findAll(): Promise<Bookings[]> {
    try {
      return await this.bookingsModel.find().exec();
    } catch (error) {
      throw new Error(`Failed to retrieve bookings: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Bookings> {
    try {
      const booking = await this.bookingsModel
        .findOne({ booking_id: id })
        .exec();
      if (!booking) {
        throw new NotFoundException('Booking not found');
      }
      return booking;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to retrieve booking: ${error.message}`);
    }
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Bookings> {
    try {
      if (updateBookingDto.booking_id || updateBookingDto.created_at) {
        throw new BadRequestException(
          "You can't edit booking_id and created_at",
        );
      }
      const updatedBooking = await this.bookingsModel
        .findOneAndUpdate({ booking_id: id }, updateBookingDto, { new: true })
        .exec();
      if (!updatedBooking) {
        throw new NotFoundException('Booking not found');
      }
      return updatedBooking;
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new Error(`Failed to update booking: ${error.message}`);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.bookingsModel
        .deleteOne({ booking_id: id })
        .exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Booking not found');
      }
      return { message: `Booking with id #${id} has been deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete booking: ${error.message}`);
    }
  }
}
