//yellos\src\Routes\analytics\analytics.controller.ts
import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsDto } from "src/dto/analytics.dto";
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('admin/analytics')
    @UseGuards(AuthGuard())
    // async findAll() {
    //     return this.analyticsService.findAll();
    // }
    async findAll(@Query('page') page: string, @Query('limit') limit: string) {
        const pageNumber = parseInt(page, 10) || 1; // Default to page 1
        const limitNumber = parseInt(limit, 10) || 10; // Default to 10 items per page

        return this.analyticsService.findAll(pageNumber, limitNumber);
    }
    @Post('/analytics')
    async create(@Body() emailData: AnalyticsDto) {
        try {
            return await this.analyticsService.createAnalytics(emailData);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Unable to create contact request');
        }
    }
}