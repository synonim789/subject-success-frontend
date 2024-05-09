import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdAlternateEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../app/api/userApiSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import {
   ForgotPasswordFields,
   forgotPasswordSchema,
} from '../../types/schemas';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const ForgotPasswordForm = () => {
   const navigate = useNavigate();
   const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm<ForgotPasswordFields>({
      resolver: zodResolver(forgotPasswordSchema),
      mode: 'onBlur',
   });

   const submitHandler: SubmitHandler<ForgotPasswordFields> = async (data) => {
      try {
         const { message } = await forgotPassword(data).unwrap();
         navigate('/otp');
         toast.success(message);
         reset();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   useEffect(() => {
      if (isLoading) {
         const loadingToast = toast.loading('Loading...', { id: 'loading' });
         return () => toast.dismiss(loadingToast);
      }
   }, [isLoading]);

   return (
      <form onSubmit={handleSubmit(submitHandler)} className="w-full px-5">
         <Input
            type="text"
            placeholder="Enter your email..."
            label="Email adress"
            name="email"
            id="email"
            icon={<MdAlternateEmail size={20} />}
            register={{ ...register('email') }}
            error={errors.email}
         />
         <SubmitButton disabled={isSubmitting} text="reset password" />
         {error && (
            <p className="mt-2 text-left font-semibold text-red-500 dark:text-red-400">
               {'status' in error
                  ? (error as { data: { message: string } }).data.message
                  : error.message}
            </p>
         )}
      </form>
   );
};
export default ForgotPasswordForm;
