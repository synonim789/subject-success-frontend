import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSetNewPasswordMutation } from '../../app/api/userApiSlice';
import ProfilePasswordInput from '../../components/ProfilePasswordInput';
import SubmitButton from '../../components/SubmitButton';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import {
   SetNewPasswordFields,
   setNewPasswordSchema,
} from '../../validation/profile';

const SetNewPasswordForm = () => {
   const [setNewPassword, { error }] = useSetNewPasswordMutation();
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm<SetNewPasswordFields>({
      resolver: zodResolver(setNewPasswordSchema),
      mode: 'onBlur',
   });

   const submitHandler: SubmitHandler<SetNewPasswordFields> = async (data) => {
      try {
         const { confirmPassword, password } = data;
         const { message } = await setNewPassword({
            confirmPassword,
            password,
         }).unwrap();
         toast.success(message);
         reset();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   return (
      <form
         className="flex w-full flex-col justify-center gap-10 rounded-xl  bg-white/80 p-8 drop-shadow-xl dark:bg-dark-600"
         onSubmit={handleSubmit(submitHandler)}
      >
         <ProfilePasswordInput
            id="password"
            placeholder="Enter Password"
            {...register('password')}
            error={errors.password}
         />
         <ProfilePasswordInput
            id="confirmPassword"
            placeholder="Re-enter Password"
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
         <SubmitButton text="Reset Password" disabled={isSubmitting} />
      </form>
   );
};
export default SetNewPasswordForm;
