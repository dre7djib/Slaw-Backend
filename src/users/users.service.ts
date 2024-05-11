import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/decorators/public.decorator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private usersRepository: Repository<users>,
  ) {}

  @Public()
  async createUser(createUserDto: CreateUserDto) {
    const exist = await this.isEmailPresent(createUserDto.email);
    console.log(exist);
    if(exist) {
      throw new NotFoundException('User already exists');
    }
    const newUser = this.usersRepository.create(createUserDto);
    const salt = 10;
    newUser.password = await bcrypt.hash(newUser.password, salt);
    return this.usersRepository.save(newUser);
}

  findAllUser() {
    return this.usersRepository.find();
  }

  async findOneUser(userId: string) {
    const user = this.usersRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(email: string) {
    const user = this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

    async isEmailPresent(email: string): Promise<boolean> {
      const user = await this.usersRepository.findOneBy({ email });
      return !!user;
  }

    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
      const user = await this.findOneUser(userId);
      const updatedUser = { ...user, ...updateUserDto };
      return this.usersRepository.save(updatedUser);
    }

  async removeUser(userId: string) {
    const user = await this.findOneUser(userId);
    return this.usersRepository.remove(user);
  }
}
