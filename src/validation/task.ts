import { z } from 'zod';

export const addTaskSchema = z.object({
   name: z.string().min(1, 'Required'),
   date: z.string().min(8, 'Required'),
});

export type AddTaskFields = z.infer<typeof addTaskSchema>;

export const editTaskSchema = z.object({
   name: z.string().min(1, 'Required'),
   date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
   }),
});

export type EditTaskFields = z.infer<typeof editTaskSchema>;
