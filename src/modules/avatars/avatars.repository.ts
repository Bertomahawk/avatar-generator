import { AvatarInterface } from "./avatar.interface";

export class AvatarsRepository implements AvatarInterface {
  getAvatarFromPrompt(prompt: string) {
    return new ArrayBuffer(0);
  }

  getAvatarFromImage(image: Express.Multer.File) {
    return new ArrayBuffer(0);
  }

  getAvatarFromPromptAndImage(prompt: string, image: Express.Multer.File) {
    return new ArrayBuffer(0);
  }
}