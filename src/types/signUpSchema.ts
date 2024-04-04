import { z } from 'zod';

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
