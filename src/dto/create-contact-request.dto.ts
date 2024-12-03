import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateContactRequestDto {

    @ApiProperty({
        description: 'first name of the user\'s last name. Must be a string between 10 and 500 characters.',
        type: String,
        example: 'Alexander',
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    first_name: string;

    @ApiProperty({
        description: 'second name of the user\'s last name. Must be a string between 10 and 500 characters.',
        type: String,
        example: 'Smith',
    })
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    last_name: string;

    @ApiProperty({
        description: 'The email of the user',
        type: String,
        example: 'user@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email_address: string;

    @ApiProperty({
        description: 'The URL of the shop',
        type: String,
        example: 'https://example-shop.com',
    })
    @IsUrl()
    @IsNotEmpty()
    shop_url: string;


    @ApiProperty({
        description: 'The content of the user\'s message. Must be a string between 10 and 500 characters.',
        type: String,
        example: 'Hello, I would like to inquire about your services.',
    })
    @IsString()
    @IsNotEmpty()
    @Length(10, 500)
    message: string;
}
