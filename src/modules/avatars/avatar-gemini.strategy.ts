import { ContentListUnion, GenerateContentConfig, GoogleGenAI } from "@google/genai";
import { AvatarStrategyInterface } from "./avatar-strategy.interface";
import { StreamableFile } from "@nestjs/common";
import { createReadStream } from 'fs';
import { join } from 'path';
import { AvatarRequestError } from "./avatars";
import * as process from "node:process";

export class AvatarGeminiStrategy implements AvatarStrategyInterface {
  private _ai: GoogleGenAI;
  private _model: string;
  private _config: GenerateContentConfig;

  constructor() {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY environment variable is required');
    }
    if (!process.env.GEMINI_MODEL) {
      throw new Error('GEMINI_MODEL environment variable is required');
    }
    this._ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });
    this._model = process.env.GEMINI_MODEL;
    this._config = {
      responseModalities: [
        'IMAGE',
      ],
      temperature: 0.5,
    };
  }

  async getAvatarFromPrompt(prompt: string) {
    return new StreamableFile(createReadStream(join(process.cwd(), 'package.json')))
  }

  async getAvatarFromImage(image: Express.Multer.File) {
    return new StreamableFile(image.buffer);
  }

  async getAvatarFromPromptAndImage(prompt: string, image: Express.Multer.File) {
    const b64Image = image.buffer.toString('base64');

    const p: ContentListUnion = [
      { text: prompt },
      {
        inlineData: {
          mimeType: image.mimetype,
          data: b64Image,
        },
      },
    ];

    try {
      const file = await this.request(p);
      if (!file.data) {
        throw new Error(AvatarRequestError.NO_DATA_ERROR);
      }
      return new StreamableFile(Buffer.from(file.data, 'base64'), { type: image.mimetype });
    } catch (e) {
      if (e.status === 429) {
        throw new Error(AvatarRequestError.TOO_MANY_REQUESTS);
      }
      if (e.message === AvatarRequestError.NO_DATA_ERROR) {
        throw new Error(AvatarRequestError.NO_DATA_ERROR);
      }
      throw new Error(AvatarRequestError.UNDEFINED_ERROR);
    }
  }

  request(prompt: ContentListUnion) {
    return this._ai.models.generateContent({
      model: this._model,
      config: this._config,
      contents: prompt,
    });
  }
}