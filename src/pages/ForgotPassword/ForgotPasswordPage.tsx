import AuthLayout from '../../layout/AuthLayout';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordPage = () => {
   return (
      <AuthLayout>
         <div className="flex w-full flex-col items-center justify-center px-2 text-center">
            <h3 className="text-2xl font-semibold text-text-black md:text-3xl">
               Forgot password
            </h3>
            <p className="mt-2.5 text-sm text-text-gray md:text-base ">
               Please enter your email to reset the password.
            </p>
            <ForgotPasswordForm />
         </div>
      </AuthLayout>
   );
};
export default ForgotPasswordPage;
