import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactRequest } from "./contact-request.schema";
import { CreateContactRequestDto } from "src/dto/create-contact-request.dto";

// src / Routes/ontactrequests/ContactRequestsService
@Injectable()
export class ContactRequestsService {
    constructor(@InjectModel(ContactRequest.name) private contactRequestModel: Model<ContactRequest>) { }

    // async findAll() {
    //     return this.contactRequestModel.find().exec();
    // }
    async findAll(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const results = await this.contactRequestModel.find().skip(skip).limit(limit).exec();
        const totalCount = await this.contactRequestModel.countDocuments();
        const hasMore = page * limit < totalCount;
        if (!hasMore) {
            return {
                message: "No data found for the requested page. Please check the page number or reduce the limit.",
                totalCount,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                hasMore: hasMore
            };
        }
        return {
            data: results,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            hasMore: hasMore

        };
    }



    // async createContactRequest(data: { first_name: string, last_name: string, email_address: string, shop_url: string, message: string }) {
    //     const newContactRequest = new this.contactRequestModel(data);
    //     return newContactRequest.save();
    // }

    async createContactRequest(data: CreateContactRequestDto): Promise<ContactRequest> {
        try {
            const newContactRequest = new this.contactRequestModel(data);
            return await newContactRequest.save();
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new BadRequestException('Invalid input data');
            }
            throw new InternalServerErrorException('Something went wrong while saving the contact request');
        }
    }




}