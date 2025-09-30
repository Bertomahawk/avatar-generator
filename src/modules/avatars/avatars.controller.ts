import {
  Body,
  Controller,
  HttpException, HttpStatus,
  ParseFilePipeBuilder,
  Post, StreamableFile,
  UploadedFile,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { CrossValidationPipe, ValidationPipe } from "./validation.pipe";
import { type AvatarDTO, AvatarRequestError, avatarValidationSchema } from "./avatars";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";
import { join } from "path";

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarService: AvatarsService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async getAvatar(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 4_000_000 })
        .addFileTypeValidator({ fileType: /(png|jpg|jpeg|heic)$/ })
        .build({ fileIsRequired: false })
    ) file: Express.Multer.File,
    @Body(new ValidationPipe(avatarValidationSchema)) avatarDto: AvatarDTO
  ) {
    try {
      new CrossValidationPipe().transform({ body: avatarDto, file });
      return await this.avatarService.getAvatar(avatarDto.prompt, file);
    } catch (e) {
      throw e;
    }
  }
}
