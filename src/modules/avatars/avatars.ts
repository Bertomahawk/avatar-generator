export interface AvatarDTO {
  prompt?: string;
}

import z from 'zod';

export const avatarValidationSchema = z.object({
  prompt :z.string().optional(),
}).default({}).optional();

export enum AvatarRequestError {
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  NO_DATA_ERROR = 'NO_DATA_ERROR',
  UNDEFINED_ERROR = 'UNDEFINED_ERROR',
}