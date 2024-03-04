import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    @MinLength(3,{message: 'Please enter a valid name with at least 3 characters'})
    name?: string;
  
    @IsOptional()
    @IsInt()
    @Min(13,{message: 'You must be at least 13 years old'})
    age?: number;
}
