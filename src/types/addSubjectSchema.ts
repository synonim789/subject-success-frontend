import { z } from 'zod';

export const addSubjectSchema = z.object({
   name: z.string(),
   type: z.string(),
});

export type AddSubjectFields = z.infer<typeof addSubjectSchema>;
