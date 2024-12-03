import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactRequestsController } from './contactreq.controller';
import { ContactRequestsService } from './contactreq.service';
import { ContactRequest, ContactRequestSchema } from './contact-request.schema';
import { AuthModule } from 'src/auth/auth.module';

// src/Routes/contactrequests/contactrequests.module.ts
@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: ContactRequest.name, schema: ContactRequestSchema }])
    ],
    controllers: [ContactRequestsController],
    providers: [ContactRequestsService],
})
export class ContactRequestsModule { }

