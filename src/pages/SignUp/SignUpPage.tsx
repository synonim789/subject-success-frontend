import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
   return (
      <AuthLayout>
         <div className="flex w-full flex-col items-center justify-center px-2 text-center">
            <h3 className="text-2xl font-semibold text-text-black md:text-3xl dark:text-white/85">
               Welcome to Subject Success
            </h3>
            <p className="mt-2.5 max-w-[400px] text-sm text-text-gray md:text-base dark:text-white/60">
               Welcome! Ready to get started? Simply enter your details to
               create your account. Let's begin your journey together.
            </p>
            <span className="my-3 text-lg font-medium dark:text-white/40">
               Already have an account?{' '}
               <Link to="/login" className="text-blue-500">
                  Log in
               </Link>
            </span>
            <SignUpForm />
         </div>
      </AuthLayout>
   );
};
export default SignUpPage;
