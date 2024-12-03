//yellos\src\dto\analytics.dto.ts
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class AnalyticsDto {
    // shop_url
    @ApiProperty({
        description: 'The URL of the shop',
        type: String,
        example: 'https://example-shop.com',
    })
    @IsString()
    @IsNotEmpty()
    shop_url: string;

    // app
    @ApiProperty({
        description: 'The app type. Can be one of: WISHLIST, ANNOUNCEMENT_BAR, DISCOUNT',
        type: String,
        enum: ['WISHLIST', 'ANNOUNCEMENT_BAR', 'DISCOUNT'],
        example: 'WISHLIST',
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(['WISHLIST', 'ANNOUNCEMENT_BAR', 'DISCOUNT'], {
        message: 'app must be one of the following values: WISHLIST, ANNOUNCEMENT_BAR, DISCOUNT',
    })
    app: string;

    // event_type
    @ApiProperty({
        description: 'The event type. Can be either INSTALL or UNINSTALL',
        type: String,
        enum: ['INSTALL', 'UNINSTALL'],
        example: 'INSTALL',
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(['INSTALL', 'UNINSTALL'], {
        message: 'app must be one of the following values: WISHLIST, ANNOUNCEMENT_BAR, DISCOUNT',
    })
    event_type: string;
}
