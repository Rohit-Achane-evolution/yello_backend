import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { EmailSubscriptionService } from "./email-subscription.service";
import { EmailSubscriptionDto } from "src/dto/email-subscription";
import { AuthGuard } from "@nestjs/passport";


// src / Routes / contactrequests / ContactRequestsController
@Controller()
export class EmailSubscriptionController {
    constructor(private readonly emailSubscriptionService: EmailSubscriptionService) { }


    @Get('/admin/email-subscriptions')
    @UseGuards(AuthGuard())
    // async findAll() {
    //     return this.emailSubscriptionService.findAll();
    // }
    async findAll(@Query('page') page: string, @Query('limit') limit: string) {
        const pageNumber = parseInt(page, 10) || 1; // Default to page 1
        const limitNumber = parseInt(limit, 10) || 10; // Default to 10 items per page

        return this.emailSubscriptionService.findAll(pageNumber, limitNumber);
    }

    @Post('/email-subscriptions')
    async create(@Body() emailData: EmailSubscriptionDto) {
        try {
            return await this.emailSubscriptionService.createEmailSubscription(emailData);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Unable to create contact request');
        }
    }
}