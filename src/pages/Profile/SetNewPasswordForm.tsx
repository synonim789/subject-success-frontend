import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSetNewPasswordMutation } from '../../app/api/userApiSlice';
import ProfileInput from '../../components/ProfileInput';
import SubmitButton from '../../components/SubmitButton';
import {
   SetNewPasswordFields,
   setNewPasswordSchema,
} from '../../types/schemas';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

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
         <ProfileInput
            name="password"
            type="password"
            label="Password"
            id="password"
            placeholder="Enter Password"
            register={{ ...register('password') }}
            error={errors.password}
            isPassword
         />
         <ProfileInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            id="confirmPassword"
            placeholder="Re-enter Password"
            register={{ ...register('confirmPassword') }}
            isPassword
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
