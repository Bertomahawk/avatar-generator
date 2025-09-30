import { Body, Controller, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { CrossValidationPipe, ValidationPipe } from "./validation.pipe";
import { type AvatarDTO, avatarValidationSchema } from "./avatars";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarService: AvatarsService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  getAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 2_000_000 })
        .addFileTypeValidator({ fileType: /(png|jpg|jpeg)$/ })
        .build({ fileIsRequired: false })
    ) file: Express.Multer.File,
    @Body(new ValidationPipe(avatarValidationSchema)) avatarDto: AvatarDTO,
  ) {
    try {
      new CrossValidationPipe().transform({ body: avatarDto, file });
      return this.avatarService.getAvatar(avatarDto.prompt, file);
    } catch (e) {
      throw e;
    }
  }
}
