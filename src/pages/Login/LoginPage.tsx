import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';
import LoginForm from './LoginForm';

const LoginPage = () => {
   return (
      <AuthLayout>
         <div className="flex w-full flex-col items-center justify-center px-2 text-center">
            <h3 className="text-2xl font-semibold text-text-black md:text-3xl">
               Welcome to Subject Success
            </h3>
            <p className="mt-2.5 text-sm text-text-gray md:text-base">
               Welcome back! login with your data that you entered during
               registration.
            </p>
            <span className="my-3 text-lg font-medium">
               Don't have an account?{' '}
               <Link to="/sign-up" className="text-blue-500">
                  Sign Up
               </Link>
            </span>
            <LoginForm />
         </div>
      </AuthLayout>
   );
};
export default LoginPage;
