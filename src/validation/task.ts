import { z } from 'zod';

export const addTaskSchema = z.object({
   name: z.string(),
   date: z.coerce.date().optional(),
});

export type AddTaskFields = z.infer<typeof addTaskSchema>;

export const editTaskSchema = z.object({
   name: z.string(),
   date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
   }),
});

export type EditTaskFields = z.infer<typeof editTaskSchema>;
