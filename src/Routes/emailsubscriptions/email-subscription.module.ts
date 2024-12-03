import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailSubscriptionController } from './email-subscription.controller';
import { EmailSubscriptionService } from './email-subscription.service';
import { EmailSubscription, EmailSubscriptionSchema } from './email-subscripation.schema';
import { AuthModule } from 'src/auth/auth.module';

// src/Routes/contactrequests/contactrequests.module.ts
@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: EmailSubscription.name, schema: EmailSubscriptionSchema }])
    ],
    controllers: [EmailSubscriptionController],
    providers: [EmailSubscriptionService],
})
export class EmailSubscriptionModule { }

