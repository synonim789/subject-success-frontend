import { z } from 'zod';

export const editSubjectSchema = z.object({
   name: z.string(),
   type: z.enum(['grade', 'completion']),
   grade: z.number().min(0).max(6).nullable(),
   completion: z.boolean().nullable(),
});

export type editSubjectFields = z.infer<typeof editSubjectSchema>;
