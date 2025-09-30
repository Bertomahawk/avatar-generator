import { Module } from '@nestjs/common';
import { AvatarsController } from './avatarsController';
import { AvatarsService } from './avatars.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AvatarInterfaceToken } from "./avatar.interface";
import { AvatarsRepository } from "./avatars.repository";

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [AvatarsController],
  providers: [AvatarsService,
    {
      provide: AvatarInterfaceToken,
      useClass: AvatarsRepository,
    }
    ],
})
export class AvatarsModule {}
