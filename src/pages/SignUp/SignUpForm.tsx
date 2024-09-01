import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdAlternateEmail, MdDriveFileRenameOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../app/api/userApiSlice';
import Input from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import SubmitButton from '../../components/SubmitButton';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import { SignUpFields, signUpSchema } from '../../validation/auth';

const SignUpForm = () => {
   const navigate = useNavigate();
   const [signUp, { isLoading, error }] = useSignUpMutation();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm<SignUpFields>({
      resolver: zodResolver(signUpSchema),
      mode: 'onBlur',
   });

   const submitHandler: SubmitHandler<SignUpFields> = async (data) => {
      try {
         const { message } = await signUp(data).unwrap();
         navigate('/login');
         toast.success(message);
         reset();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
         console.log(err);
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
      <>
         <form onSubmit={handleSubmit(submitHandler)} className="w-full px-5">
            <Input
               type="text"
               placeholder="Enter your email..."
               labelText="Email adress"
               className="border"
               id="email"
               icon={<MdAlternateEmail size={20} />}
               {...register('email')}
               error={errors.email}
            />
            <Input
               type="text"
               placeholder="Enter your username..."
               labelText="Username"
               id="username"
               className="border"
               icon={<MdDriveFileRenameOutline size={20} />}
               {...register('username')}
               error={errors.username}
            />
            <PasswordInput
               type="password"
               className="border"
               placeholder="**********"
               id="password"
               {...register('password')}
               error={errors.password}
            />
            <SubmitButton text="Sign Up" disabled={isSubmitting} />
            {error && (
               <p className="mt-2 text-left font-semibold text-red-500 dark:text-red-400">
                  {'status' in error
                     ? (error as { data: { message: string } }).data.message
                     : error.message}
               </p>
            )}
         </form>
      </>
   );
};
export default SignUpForm;
