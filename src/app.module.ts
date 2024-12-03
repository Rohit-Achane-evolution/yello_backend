import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ContactRequestsModule } from './Routes/contactrequests/contactrequests.module';
import { EmailSubscriptionModule } from './Routes/emailsubscriptions/email-subscription.module';
import { AnalyticsModule } from './Routes/analytics/analytics.modules';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './adminseed/adminseed.module';

@Module({

  imports: [DatabaseModule, ContactRequestsModule, EmailSubscriptionModule, AnalyticsModule, AuthModule, SeedModule],

  controllers: [],

  providers: [],

})
export class AppModule { }
