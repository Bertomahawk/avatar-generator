import { Module } from '@nestjs/common';
import { AvatarsController } from './avatarsController';
import { AvatarsService } from './avatars.service';
import { AvatarInterfaceToken } from "./avatar.interface";
import { AvatarsRepository } from "./avatars.repository";

@Module({
  imports: [],
  controllers: [AvatarsController],
  providers: [AvatarsService,
    {
      provide: AvatarInterfaceToken,
      useClass: AvatarsRepository,
    }
  ],
})
export class AvatarsModule {}
