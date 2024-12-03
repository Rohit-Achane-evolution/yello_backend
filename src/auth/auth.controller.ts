// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/singup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // @Post('/signup')
    // signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    //     return this.authService.signUp(signUpDto);
    // }

    @Post('/login')
    @HttpCode(HttpStatus.OK) // Explicitly define the response status
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
}