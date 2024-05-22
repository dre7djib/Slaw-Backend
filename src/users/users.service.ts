import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/decorators/public.decorator';
import { Users } from './schema/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}
  private readonly logger = new Logger(UsersService.name);

  @Public()
  async createUser(createUserDto: CreateUserDto) {
    this.logger.log('Creating a new user');
    /*const exist = await this.isEmailPresent(createUserDto.email);
    console.log(exist);
    if(exist) {
      throw new NotFoundException('User already exists');
    }*/
    const newUser = new this.usersModel(createUserDto);
    const salt = 10;
    newUser.password = await bcrypt.hash(newUser.password, salt);
    return newUser.save();
  }

  async findAllUser() {
    this.logger.log('Finding all users');
    return this.usersModel.find().exec();
  }

  async findOneUser(id: string) {
    this.logger.log('Finding one user');
    const user = await this.usersModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findUserByEmail(e: string) {
    this.logger.log('Finding user by email');
    const user = await this.usersModel.findOne({ email: e}).exec();
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return user;
  }

  async isEmailPresent(e: string): Promise<boolean> {
    this.logger.log('Checking if email is present');
    const user = await this.usersModel.findOne({ email: e}).exec();
    return !!user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    this.logger.log('Updating user');
    const user = await this.usersModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    return user;
}

  async removeUser(id: string) {
    this.logger.log('Removing user');
    const user = await this.usersModel.findByIdAndDelete(id).exec();
    return user
  }
}
