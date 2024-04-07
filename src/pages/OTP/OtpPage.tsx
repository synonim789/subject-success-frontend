import AuthLayout from '../../layout/AuthLayout';
import OtpForm from './OtpForm';

const OtpPage = () => {
   return (
      <AuthLayout>
         <div className="flex w-full flex-col items-center justify-center px-2 text-center">
            <h3 className="text-2xl font-semibold text-text-black md:text-3xl dark:text-white/85">
               Check your email
            </h3>
            <p className="mt-2.5 max-w-[400px] text-sm text-text-gray md:text-base dark:text-white/60">
               We sent a reset link to your email. Enter 4 digit code that was
               send to your email.
            </p>
            <OtpForm />
         </div>
      </AuthLayout>
   );
};
export default OtpPage;
