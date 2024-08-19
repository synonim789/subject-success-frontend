import { z } from 'zod';

export const forgotPasswordSchema = z.object({
   email: z.string().email(),
});

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

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

export type LoginFields = z.infer<typeof loginSchema>;

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

export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>;

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

export type SignUpFields = z.infer<typeof signUpSchema>;
