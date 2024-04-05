import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdAlternateEmail } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../app/api/authApiSlice';
import { setUser } from '../../app/slices/authSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import { LoginFields, loginSchema } from '../../types/loginSchema';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const LoginForm = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
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
         const accessToken = await login({
            email: data.email,
            password: data.password,
         }).unwrap();
         dispatch(setUser({ accessToken: accessToken }));
         navigate('/');
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
      <>
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
                  className="text-right text-sm text-gray-400 underline transition hover:text-green-600"
               >
                  Forgot Password?
               </Link>
            </div>

            <SubmitButton text="login" disabled={isSubmitting} />
            {error && (
               <p className="mt-2 text-left font-semibold text-red-500">
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
