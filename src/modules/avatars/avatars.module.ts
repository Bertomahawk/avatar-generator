import { Module } from '@nestjs/common';
import { AvatarsController } from './avatars.controller';
import { AvatarsService } from './avatars.service';
import { AvatarInterfaceToken } from "./avatar-strategy.interface";
import { AvatarGeminiStrategy } from "./avatar-gemini.strategy";

@Module({
  imports: [],
  controllers: [AvatarsController],
  providers: [AvatarsService,
    {
      provide: AvatarInterfaceToken,
      useClass: AvatarGeminiStrategy,
    }
  ],
})
export class AvatarsModule {}
