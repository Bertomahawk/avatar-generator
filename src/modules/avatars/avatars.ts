export interface AvatarDTO {
  prompt?: string;
}

import z from 'zod';

export const avatarValidationSchema = z.object({
  prompt :z.string(),
});