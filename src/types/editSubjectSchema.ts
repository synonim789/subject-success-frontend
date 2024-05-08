import { z } from 'zod';

export const editSubjectSchema = z.object({
   name: z.string(),
   type: z.enum(['grade', 'completion']),
   grade: z.number().min(0).max(6).nullish(),
   completion: z.boolean().nullish(),
});

export type editSubjectFields = z.infer<typeof editSubjectSchema>;
