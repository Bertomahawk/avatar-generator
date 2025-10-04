import { NestFactory } from '@nestjs/core';
import { RootModule } from "./app.module";
import * as dotenv from 'dotenv';
import fetch, { Headers, Request, Response } from "node-fetch";

dotenv.config();

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
}

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
