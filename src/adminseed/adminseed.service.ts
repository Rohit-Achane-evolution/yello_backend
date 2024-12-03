import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/auth/schema/user.schema";
import * as bcrypt from 'bcrypt';
import { ADMIN_Email, ADMIN_PASSWORD, ROLE } from "./seedconstants";

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) { }

    async createDefaultAdmin() {
        try {
            // Check if admin already exists
            const admin = await this.userModel.findOne({ role: ROLE });
            if (admin) {
                this.logger.log('Default admin already exists.');
                return
            }
            // Hash default password
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
            // Create default admin user
            const defaultAdmin = {
                email_address: ADMIN_Email,
                password: hashedPassword,
                role: ROLE
            };
            const adminUser = await this.userModel.create(defaultAdmin);
            adminUser.save();
            this.logger.log('Default admin created successfully.');
        } catch (error) {
            this.logger.error('Error creating default admin:', error.message);
            throw new Error('Failed to create default admin');
        }
    }
}
