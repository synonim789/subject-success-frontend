import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdAlternateEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../app/api/authApiSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import { LoginFields, loginSchema } from '../../validation/auth';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const LoginForm = () => {
   const navigate = useNavigate();
   const [login, { isLoading, error }] = useLoginMutation();
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm<LoginFields>({
      resolver: zodResolver(loginSchema),
      mode: 'onBlur',
   });

   const submitHandler: SubmitHandler<LoginFields> = async (data) => {
      try {
         await login({
            email: data.email,
            password: data.password,
         }).unwrap();
         navigate('/');
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
      <>
         <form onSubmit={handleSubmit(submitHandler)} className="w-full px-5">
            <Input
               type="email"
               placeholder="Enter your email..."
               label="Email adress"
               name="email"
               id="email"
               icon={<MdAlternateEmail size={20} />}
               register={{ ...register('email') }}
               error={errors.email}
            />
            <Input
               type="password"
               placeholder="**********"
               label="Password"
               name="password"
               id="password"
               isPassword={true}
               register={{ ...register('password') }}
               error={errors.password}
            />
            <div className="mb-2 w-full text-right">
               <Link
                  to="/forgot-password"
                  className="text-right text-sm text-gray-400 underline transition hover:text-green-600 dark:text-white/40"
               >
                  Forgot Password?
               </Link>
            </div>

            <SubmitButton text="login" disabled={isSubmitting} />
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
export default LoginForm;
