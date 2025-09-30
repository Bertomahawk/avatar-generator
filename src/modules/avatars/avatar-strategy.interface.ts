export interface AvatarStrategyInterface {
  getAvatarFromPrompt(prompt: string): ArrayBuffer;
  getAvatarFromImage(image: Express.Multer.File): ArrayBuffer;
  getAvatarFromPromptAndImage(prompt: string, image: Express.Multer.File): ArrayBuffer;
}

export const AvatarInterfaceToken = Symbol("AvatarInterface")