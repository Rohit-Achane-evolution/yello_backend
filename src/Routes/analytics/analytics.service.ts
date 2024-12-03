// src/Routes/analytics/analytics.service.ts
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Analytics } from "./analytics.schema";
import { Model } from "mongoose";
import { AnalyticsDto } from "src/dto/analytics.dto";

@Injectable()
export class AnalyticsService {

    constructor(@InjectModel(Analytics.name) private AnalyticsModel: Model<Analytics>) { }

    async findAll(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const results = await this.AnalyticsModel.find().skip(skip).limit(limit).exec();
        const totalCount = await this.AnalyticsModel.countDocuments();
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

    async createAnalytics(data: AnalyticsDto): Promise<Analytics> {
        try {
            const analytics = new this.AnalyticsModel(data);
            return await analytics.save();
        } catch (error) {
            if (error.name === 'ValidationError') {
                throw new BadRequestException('Invalid input data');
            }
            throw new InternalServerErrorException('Something went wrong while saving the contact request');
        }
    }

}