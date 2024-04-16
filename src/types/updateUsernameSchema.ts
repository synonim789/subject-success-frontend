import { z } from 'zod';

export const updateUsernameSchema = z.object({
   email: z.string().email(),
   username: z.string().min(8, 'Username should be at least 8 characters'),
});

export type UpdateUsernameFields = z.infer<typeof updateUsernameSchema>;
