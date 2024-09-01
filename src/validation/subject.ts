import { z } from 'zod';

export const addSubjectSchema = z.object({
   name: z.string().min(1, 'Required'),
   type: z.enum(['grade', 'completion']),
});

export type AddSubjectFields = z.infer<typeof addSubjectSchema>;

export const editSubjectSchema = z.object({
   name: z.string().min(1, 'Required'),
   type: z.enum(['grade', 'completion']),
   grade: z.number().min(0).max(6).nullish(),
   completion: z.boolean().nullish(),
});

export type EditSubjectFields = z.infer<typeof editSubjectSchema>;
