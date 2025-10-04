import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AvatarInterfaceToken } from "./avatar-strategy.interface";
import { type AvatarStrategyInterface } from "./avatar-strategy.interface";
import { AvatarRequestError } from "./avatars";

@Injectable()
export class AvatarsService {

  constructor(
    @Inject(AvatarInterfaceToken)
    private readonly avatarStrategy: AvatarStrategyInterface) {
  }

  async getAvatar(prompt?: string, image?: Express.Multer.File) {
    try {
      if (prompt && image) {
        const f = await this.avatarStrategy.getAvatarFromPromptAndImage(prompt, image);
        return f
      } else if (prompt) {
        return await this.avatarStrategy.getAvatarFromPrompt(prompt);
      } else if (image) {
        return await this.avatarStrategy.getAvatarFromImage(image);
      }
      return null;
    } catch (e) {
      throw this.handleError(e);
    }
  }

  handleError(e: any) {
    if (e instanceof Error) {
      switch (e.message) {
        case AvatarRequestError.UNDEFINED_ERROR:
          return new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        case AvatarRequestError.NO_DATA_ERROR:
          return new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
        case AvatarRequestError.TOO_MANY_REQUESTS:
          return new HttpException(e.message, HttpStatus.TOO_MANY_REQUESTS);
      }
    }
  }
}
