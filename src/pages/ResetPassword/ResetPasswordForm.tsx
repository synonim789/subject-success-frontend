import { zodResolver } from '@hookform/resolvers/zod';

import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../app/api/userApiSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import { ResetPasswordFields, resetPasswordSchema } from '../../types/schemas';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

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
         <Input
            type="password"
            placeholder="Enter your new password"
            label="Password"
            id="password"
            name="password"
            register={{ ...register('password') }}
            error={errors.password}
            isPassword={true}
         />
         <Input
            type="password"
            placeholder="Re-enter password"
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            register={{ ...register('confirmPassword') }}
            error={errors.confirmPassword}
            isPassword={true}
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
