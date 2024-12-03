import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// src/Routes/contactrequests/contact-request.schema.ts
@Schema({ versionKey: false })
export class ContactRequest extends Document {
    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true, unique: true })
    email_address: string;

    @Prop({ required: true })
    shop_url: string;

    @Prop({ required: true })
    message: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ContactRequestSchema = SchemaFactory.createForClass(ContactRequest);

