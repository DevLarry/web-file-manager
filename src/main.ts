import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app
  await app
    .use(cors())
    .use(express.static(path.join(__dirname, 'public')))
    .listen(3000);
}
bootstrap();
