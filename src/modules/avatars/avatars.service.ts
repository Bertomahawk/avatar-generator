import { Inject, Injectable } from '@nestjs/common';
import { AvatarInterfaceToken } from "./avatar.interface";
import { type AvatarInterface } from "./avatar.interface";

@Injectable()
export class AvatarsService {

  constructor(
    @Inject(AvatarInterfaceToken)
    private readonly avatarRepo: AvatarInterface) {
  }

  getAvatar(prompt?: string, image?: Express.Multer.File) {
    if (prompt && image) {
      console.log('prompt & image');
      return this.avatarRepo.getAvatarFromPromptAndImage(prompt, image);
    } else if (prompt) {
      console.log('prompt');
      return this.avatarRepo.getAvatarFromPrompt(prompt);
    } else if (image) {
    console.log('image');
      return this.avatarRepo.getAvatarFromImage(image);
    }
    return null;
  }
}
