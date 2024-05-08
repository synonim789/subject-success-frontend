import { z } from 'zod';

export const addTaskSchema = z.object({
   name: z.string(),
});

export type AddTaskFields = z.infer<typeof addTaskSchema>;
