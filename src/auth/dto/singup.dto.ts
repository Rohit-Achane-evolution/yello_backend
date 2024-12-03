import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'user@example.com',
    })
    @IsEmail()
    email_address: string;

    @ApiProperty({
        description: 'The password of the user. Must be a string with at least 6 or more characters.',
        example: 'password123',
    })
    @IsString()
    @MinLength(6)
    password: string;


    @ApiProperty({
        description: 'role of the user',
        example: 'admin',
    })
    @IsEmail()
    role: string;

}