import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') userId: string) {
    try {
      return this.usersService.findOneUser(userId);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  
  @Public()
  @Get()
  findAll() {
    return this.usersService.findAllUser();
  }

  @Public()
  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException("The account already exists.");
    }
  }

  @Patch(':id')
  update(@Param('id') userId: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(userId, updateUserDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id') userId: string) {
    try {
      return this.usersService.removeUser(userId);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
