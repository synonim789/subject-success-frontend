import { z } from 'zod';

export const addSubjectSchema = z.object({
   name: z.string(),
   type: z.enum(['grade', 'completion']),
});

export type AddSubjectFields = z.infer<typeof addSubjectSchema>;
