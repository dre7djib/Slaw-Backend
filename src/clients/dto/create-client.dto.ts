import { IsInt, IsString, Min } from "class-validator";


export class CreateClientDto {
    name: string;

    @IsInt()
    @Min(0, {message: 'Must be at least 0 years old'})
    age: number;

    @IsString()
    phone_number: string;

    userId: string;
}
