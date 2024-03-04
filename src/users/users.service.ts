import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private usersRepository: Repository<users>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = {
      id: Date.now(),
      ...createUserDto
    }
    this.usersRepository.save(newUser)
    return newUser;
  }

  findAllUser() {
    return this.usersRepository.find();
  }

  findOneUser(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOneUser(id);
    const updatedUser = {
      ...user,
      ...updateUserDto
    };
    await this.usersRepository.update(id, updatedUser);
    return updatedUser;
  }

  async removeUser(id: number) {
    await this.usersRepository.delete(id);
  }
}
