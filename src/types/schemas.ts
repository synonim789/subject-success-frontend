import { z } from 'zod';

export const addSubjectSchema = z.object({
   name: z.string(),
   type: z.enum(['grade', 'completion']),
});

export const addTaskSchema = z.object({
   name: z.string(),
   date: z.coerce.date().optional(),
});

export const editSubjectSchema = z.object({
   name: z.string(),
   type: z.enum(['grade', 'completion']),
   grade: z.number().min(0).max(6).nullish(),
   completion: z.boolean().nullish(),
});

export const forgotPasswordSchema = z.object({
   email: z.string().email(),
});

export const loginSchema = z.object({
   email: z.string().email(),
   password: z
      .string()
      .min(8, 'Password should be at least 8 characters')
      .refine(
         (value) =>
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value),
         'Use at least 8 characters one uppercase letter one lowercase letter and one number in your password',
      ),
});

export const resetPasswordSchema = z
   .object({
      password: z
         .string()
         .min(8, 'Password should be at least 8 characters')
         .refine(
            (value) =>
               /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                  value,
               ),
            'Use at least 8 characters one uppercase letter one lowercase letter and one number in your password',
         ),
      confirmPassword: z
         .string()
         .min(8, 'Password should be at least 8 characters')
         .refine(
            (value) =>
               /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                  value,
               ),
            'Use at least 8 characters one uppercase letter one lowercase letter and one number in your password',
         ),
   })
   .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords does not match',
   });

export const setNewPasswordSchema = z
   .object({
      password: z
         .string()
         .min(8, 'Password should be at least 8 characters')
         .refine(
            (value) =>
               /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                  value,
               ),
            'Use at least 8 characters one uppercase letter one lowercase letter and one number in your password',
         ),
      confirmPassword: z
         .string()
         .min(8, 'Password should be at least 8 characters')
         .refine(
            (value) =>
               /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                  value,
               ),
            'Use at least 8 characters one uppercase letter one lowercase letter and one number in your password',
         ),
   })
   .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'Passwords does not match',
   });

export const signUpSchema = z.object({
   email: z.string().email(),
   username: z.string().min(8, 'Username should be at least 8 characters'),
   password: z
      .string()
      .min(8, 'Password should be at least 8 characters')
      .refine(
         (value) =>
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value),
         'Use at least 8 characters one uppercase letter one lowercase letter and one number in your password',
      ),
});

export const updateUsernameSchema = z.object({
   email: z.string().email(),
   username: z.string().min(8, 'Username should be at least 8 characters'),
});

export const editTaskSchema = z.object({
   name: z.string(),
   date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
   }),
});

export type AddSubjectFields = z.infer<typeof addSubjectSchema>;
export type AddTaskFields = z.infer<typeof addTaskSchema>;
export type EditSubjectFields = z.infer<typeof editSubjectSchema>;
export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;
export type LoginFields = z.infer<typeof loginSchema>;
export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>;
export type SetNewPasswordFields = z.infer<typeof setNewPasswordSchema>;
export type SignUpFields = z.infer<typeof signUpSchema>;
export type UpdateUsernameFields = z.infer<typeof updateUsernameSchema>;
export type EditTaskFields = z.infer<typeof editTaskSchema>;
