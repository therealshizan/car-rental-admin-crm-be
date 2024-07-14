import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import { Users } from './users.schema';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { generateId } from 'src/common/generate-id';

// ------------------------------------------------------------------------------------

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, phone } = createUserDto;
    createUserDto.id = generateId('user');

    const existingUser = await this.usersModel.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (existingUser) {
      throw new BadRequestException('Username, email or phone already exists');
    }

    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<Users[]> {
    const users = await this.usersModel.find().exec();

    if (users.length > 0) {
      return users;
    } else {
      throw new BadRequestException('No Users Found');
    }
  }

  async findOne(id: string) {
    const user = await this.usersModel.findOne({ id });

    if (user) {
      return this.usersModel.findOne({ id });
    } else {
      throw new BadRequestException('User Not Found');
    }
  }

  async findWithUsername(username: string) {
    const user = await this.usersModel.findOne({ username });

    if (user) {
      return this.usersModel.findOne({ username });
    } else {
      throw new BadRequestException('User Not Found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersModel.findOne({ id });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    Object.assign(user, updateUserDto);

    await user.save();

    return user;
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.usersModel.findOne({ id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    await this.usersModel.deleteOne({ id: id });
    return { message: `User ${user.username} has been deleted` };
  }
}
