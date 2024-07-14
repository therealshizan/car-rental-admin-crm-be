import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  Put,
  HttpStatus,
  Res,
  NotFoundException,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';

import { Users } from './users.schema';

import { Response } from 'express';

import { responseGenerators } from 'src/lib/utils';

import { IResponseGenerators } from 'src/lib/types';

import { User } from './entities/user.entity';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// ------------------------------------------------------------------------------------

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      const response = responseGenerators(
        createdUser,
        HttpStatus.CREATED,
        'User Created Successfully',
        false,
      );

      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Unexpected error occurred');
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll(
    @Res() res: Response,
  ): Promise<Response<any, Record<string, IResponseGenerators<Users[]>>>> {
    try {
      const users = await this.usersService.findAll();

      const response: IResponseGenerators<Users[]> = {
        data: users,
        status_code: HttpStatus.OK,
        status_message: 'Users Found Successfully',
        response_error: false,
      };

      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Unexpected error occurred');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return a single user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);

      const response: IResponseGenerators<User> = {
        data: user,
        status_code: HttpStatus.OK,
        status_message: 'User Found Successfully',
        response_error: false,
      };

      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Get('find-with-username/:username')
  @ApiOperation({ summary: 'Get user by Username' })
  @ApiResponse({ status: 200, description: 'Return a single user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findWithUsername(@Param('username') username: string, @Res() res: Response) {
    try {
      const user = await this.usersService.findWithUsername(username);

      const response: IResponseGenerators<User> = {
        data: user,
        status_code: HttpStatus.OK,
        status_message: 'User Found Successfully',
        response_error: false,
      };

      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiResponse({ status: 200, description: 'User updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);

      const response: IResponseGenerators<Users> = {
        data: updatedUser,
        status_code: HttpStatus.CREATED,
        status_message: 'User Edited Successfully',
        response_error: false,
      };

      return res.status(HttpStatus.CREATED).send(response);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Unexpected error occurred');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const deleteUser = await this.usersService.remove(id);
      console.log(deleteUser);
      const response = responseGenerators(
        {},
        HttpStatus.OK,
        deleteUser.message,
        false,
      );
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new BadRequestException(error.message);
    }
  }
}
