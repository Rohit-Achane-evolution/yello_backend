import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { ContactRequestsService } from "./contactreq.service";
import { CreateContactRequestDto } from "src/dto/create-contact-request.dto";
import { AuthGuard } from "@nestjs/passport";


// src / Routes / contactrequests / ContactRequestsController
@Controller()
export class ContactRequestsController {
    constructor(private readonly contactRequestsService: ContactRequestsService) { }

    @Get('/admin/contact-requests')
    @UseGuards(AuthGuard())
    // async findAll() {
    //     return this.contactRequestsService.findAll();
    // }
    async findAll(@Query('page') page: string, @Query('limit') limit: string) {
        const pageNumber = parseInt(page, 10) || 1; // Default to page 1
        const limitNumber = parseInt(limit, 10) || 10; // Default to 10 items per page

        return this.contactRequestsService.findAll(pageNumber, limitNumber);
    }


    @Post('/contact-requests')
    async create(@Body() contactData: CreateContactRequestDto) {
        try {
            return await this.contactRequestsService.createContactRequest(contactData);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new BadRequestException('Unable to create contact request');
        }
    }
}