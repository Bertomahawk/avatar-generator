import { AvatarStrategyInterface } from "./avatar-strategy.interface";

export class AvatarGeminiStrategy implements AvatarStrategyInterface {
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