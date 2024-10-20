import { zodResolver } from '@hookform/resolvers/zod';

import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../app/api/userApiSlice';
import { PasswordInput } from '../../components/PasswordInput';
import SubmitButton from '../../components/SubmitButton';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import {
   ResetPasswordFields,
   resetPasswordSchema,
} from '../../validation/auth';

type Props = {
   otp: number;
};

const ResetPasswordForm = ({ otp }: Props) => {
   const navigate = useNavigate();
   const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm<ResetPasswordFields>({
      resolver: zodResolver(resetPasswordSchema),
      mode: 'onBlur',
   });

   const submitHandler: SubmitHandler<ResetPasswordFields> = async (data) => {
      try {
         const { confirmPassword, password } = data;
         const { message } = await resetPassword({
            confirmPassword,
            password,
            otp,
         }).unwrap();
         toast.success(message);
         navigate('/reset-password-success');
         reset();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   if (isLoading) {
      return (
         <AiOutlineLoading3Quarters
            className="animate-spin dark:text-white"
            size={40}
         />
      );
   }

   return (
      <form onSubmit={handleSubmit(submitHandler)} className="w-full px-5">
         <PasswordInput
            placeholder="Enter your new password"
            id="password"
            {...register('password')}
            labelText="Password"
            error={errors.password}
         />
         <PasswordInput
            placeholder="Re-enter password"
            id="confirmPassword"
            labelText="Confirm Password"
            {...register('confirmPassword')}
            error={errors.confirmPassword}
         />
         {error && (
            <p className="mt-2 text-left font-semibold text-red-500 dark:text-red-400">
               {'status' in error
                  ? (error as { data: { message: string } }).data.message
                  : error.message}
            </p>
         )}
         <SubmitButton text="update password" disabled={isSubmitting} />
      </form>
   );
};
export default ResetPasswordForm;
