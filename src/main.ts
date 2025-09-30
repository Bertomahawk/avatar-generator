import { NestFactory } from '@nestjs/core';
import { AvatarsModule } from './modules/avatars/avatars.module';

async function bootstrap() {
  const app = await NestFactory.create(AvatarsModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
