// src/Routes/analytics/analytics.modules.ts
import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Analytics, AnalyticsSchema } from "./analytics.schema";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsController } from "./analytics.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: Analytics.name, schema: AnalyticsSchema }])
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule { }
