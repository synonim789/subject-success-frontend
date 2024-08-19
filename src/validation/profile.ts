import { z } from 'zod';

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

export type SetNewPasswordFields = z.infer<typeof setNewPasswordSchema>;

export const updateUsernameSchema = z.object({
   email: z.string().email(),
   username: z.string().min(8, 'Username should be at least 8 characters'),
});

export type UpdateUsernameFields = z.infer<typeof updateUsernameSchema>;
