// D: \yellos\src\Routes\analytics\analytics.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Analytics extends Document {
    @Prop({ required: true })
    shop_url: string;

    @Prop({ required: true, enum: ['WISHLIST', 'ANNOUNCEMENT_BAR', 'DISCOUNT'] })
    app: string;

    @Prop({ required: true, enum: ['INSTALL', 'UNINSTALL'] })
    event_type: string;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
