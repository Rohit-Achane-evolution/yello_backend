import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './adminseed/adminseed.service';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*', credentials: true });
  const seedService = app.get(SeedService);

  const config = new DocumentBuilder()
    .setTitle('APIsUI')
    .setDescription('API for sending analytics data ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await seedService.createDefaultAdmin(); // Seed the admin

  await app.listen(4000);
}
bootstrap();
