import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    try {
      return this.usersService.findOneUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAllUser();
  }

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    try {
      return this.usersService.removeUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
