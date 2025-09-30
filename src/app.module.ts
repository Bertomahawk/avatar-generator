import { Module } from '@nestjs/common';
import { AvatarsModule } from './modules/avatars/avatars.module';

@Module({
  imports: [AvatarsModule],
})

export class RootModule {}
