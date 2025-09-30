import { NestFactory } from '@nestjs/core';
import { RootModule } from "./app.module";
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
