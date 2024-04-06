import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import AuthLayout from '../../layout/AuthLayout';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordPage = () => {
   const otp = useSelector((state: RootState) => state.user.otp);
   return (
      <AuthLayout>
         {otp ? (
            <div className="flex w-full flex-col items-center justify-center px-2 text-center">
               <h3 className="text-2xl font-semibold text-text-black md:text-3xl">
                  Set a new password
               </h3>
               <p className="mt-2.5 max-w-[400px] text-sm text-text-gray md:text-base">
                  Create a new password. Ensure it differes from previous ones
                  for security.
               </p>
               <ResetPasswordForm otp={otp} />
            </div>
         ) : (
            <p>OTP not found</p>
         )}
      </AuthLayout>
   );
};
export default ResetPasswordPage;
