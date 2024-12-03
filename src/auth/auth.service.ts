// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/singup.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        return user;
    }

    // async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    //     try {
    //         const { email_address, password } = signUpDto;
    //         const hashedPassword = await bcrypt.hash(password, 10);

    //         const user = await this.userModel.create({
    //             email_address,
    //             password: hashedPassword,
    //         });

    //         const token = this.jwtService.sign({ id: user._id });
    //         await user.save();
    //         return { token };

    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }
    // async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    //     try {
    //         const { email_address, password } = signUpDto;

    //         // Check if the user already exists
    //         const existingUser = await this.userModel.findOne({ email_address });
    //         if (existingUser) {
    //             throw new Error('User with this email already exists');
    //         }

    //         // Hash the password
    //         const hashedPassword = await bcrypt.hash(password, 10);

    //         // Create the user
    //         const user = await this.userModel.create({
    //             email_address,
    //             password: hashedPassword,
    //         });

    //         // Generate a token
    //         const token = this.jwtService.sign({ id: user._id });

    //         return { token };
    //     } catch (error) {
    //         console.error('Error creating user:', error.message);
    //         throw new Error('Failed to create user');
    //     }
    // }


    async login(loginDto: LoginDto): Promise<{ token: string }> {
        try {
            const { email_address, password } = loginDto;
            const user = await this.userModel.findOne({ email_address });
            if (!user) {
                throw new UnauthorizedException('Invalid email or password');
            }
            const isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw new UnauthorizedException('Invalid email or password');
            }
            const token = this.jwtService.sign({ id: user._id });
            return { token };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}