import { StreamableFile } from "@nestjs/common";

export interface AvatarStrategyInterface {
 getAvatarFromPrompt(prompt: string): Promise<StreamableFile>;
 getAvatarFromImage(image: Express.Multer.File): Promise<StreamableFile>;
 getAvatarFromPromptAndImage(prompt: string, image: Express.Multer.File): Promise<StreamableFile>;
}

export const AvatarInterfaceToken = Symbol("AvatarInterface")