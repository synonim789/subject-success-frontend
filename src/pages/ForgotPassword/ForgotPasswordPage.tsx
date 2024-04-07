import AuthLayout from '../../layout/AuthLayout';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordPage = () => {
   return (
      <AuthLayout>
         <div className="flex w-full flex-col items-center justify-center px-2 text-center">
            <h3 className="text-2xl font-semibold text-text-black md:text-3xl dark:text-white/85">
               Forgot password
            </h3>
            <p className="mb-2 mt-2.5 text-sm text-text-gray md:text-base dark:text-white/60">
               Please enter your email to reset the password.
            </p>
            <ForgotPasswordForm />
         </div>
      </AuthLayout>
   );
};
export default ForgotPasswordPage;
