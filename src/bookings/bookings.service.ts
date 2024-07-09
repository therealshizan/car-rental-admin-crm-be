import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bookings } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { generateId } from 'src/common/generate-id';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Bookings.name) private readonly bookingsModel: Model<Bookings>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Bookings> {
    createBookingDto.booking_id = generateId('booking');
    const createdBooking = new this.bookingsModel(createBookingDto);
    return createdBooking.save();
  }

  async findAll(): Promise<Bookings[]> {
    return this.bookingsModel.find().exec();
  }

  async findOne(id: string): Promise<Bookings> {
    const booking = await this.bookingsModel.findOne({ booking_id: id }).exec();
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<Bookings> {
    if(updateBookingDto.booking_id || updateBookingDto.created_at){
      throw new BadRequestException("You can't edit booking_id and created_at")
    }
    const updatedBooking = await this.bookingsModel
      .findOneAndUpdate({ booking_id: id }, updateBookingDto, { new: true })
      .exec();
    if (!updatedBooking) {
      throw new NotFoundException('Booking not found');
    }
    return updatedBooking;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.bookingsModel
      .deleteOne({ booking_id: id })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Booking not found');
    }
    return { message: `Booking with id #${id} has been deleted` };
  }
}
