import { IsEmail, IsInt, Min, MinLength } from "class-validator";

export class CreateUserDto {
    id: number;

    @MinLength(3, {message: 'Please enter a valid name with at least 3 characters'})
    name: string;

    @IsInt()
    @Min(13, {message: 'You must be at least 13 years old to register'})
    age: number;

    isActive: boolean;

    @IsEmail()
    email: string;

    @MinLength(8, {message: 'Password must be at least 8 characters long'})
    password: string;
}

