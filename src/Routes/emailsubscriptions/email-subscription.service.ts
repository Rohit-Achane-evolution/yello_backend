import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailSubscriptionDto } from "src/dto/email-subscription";
import { EmailSubscription } from "./email-subscripation.schema";

// src / Routes/ontactrequests/ContactRequestsService
@Injectable()
export class EmailSubscriptionService {
    constructor(@InjectModel(EmailSubscription.name) private emailSubscriptionModel: Model<EmailSubscription>) { }


    async findAll(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const results = await this.emailSubscriptionModel.find().skip(skip).limit(limit).exec();
        const totalCount = await this.emailSubscriptionModel.countDocuments();
        const hasMore = page * limit < totalCount;
        if (!hasMore) {
            return { message: "No data found for the requested page. Please check the page number or reduce the limit." };
        }
        return {
            message: "No data found for the requested page. Please check the page number or reduce the limit.",
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            hasMore: hasMore
        };
    }
    async createEmailSubscription(data: EmailSubscriptionDto): Promise<EmailSubscription> {
        try {
            const newEmailSubscription = new this.emailSubscriptionModel(data);
            return await newEmailSubscription.save();
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new BadRequestException('Invalid input data');
            }
            throw new InternalServerErrorException('Something went wrong while saving the contact request');
        }
    }




}