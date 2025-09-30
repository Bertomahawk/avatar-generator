import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { AvatarDTO } from "./avatars";
import { z } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform<AvatarDTO> {
  constructor(private schema: z.ZodSchema) {}

  transform(value: AvatarDTO) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Validation failed');
    }
  }
}

@Injectable()
export class CrossValidationPipe implements PipeTransform<{ body: AvatarDTO, file?: Express.Multer.File }> {

  transform(value: { body: AvatarDTO, file?: Express.Multer.File }) {
    const { body, file } = value;

    if (!body.prompt || !file) {
      throw new BadRequestException('At least one of prompt or image must be provided');
    }
    return value;
  }
}