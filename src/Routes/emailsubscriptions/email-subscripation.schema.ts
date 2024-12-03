import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// src/Routes/contactrequests/contact-request.schema.ts
@Schema({ versionKey: false })
export class EmailSubscription extends Document {
    @Prop({ required: true })
    email_address: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}
export const EmailSubscriptionSchema = SchemaFactory.createForClass(EmailSubscription);

