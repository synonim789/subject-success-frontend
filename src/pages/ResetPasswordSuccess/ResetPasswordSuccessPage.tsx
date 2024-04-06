import { BsCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';

const ResetPasswordSuccessPage = () => {
   return (
      <AuthLayout>
         <div className="flex w-full flex-col items-center justify-center gap-10 px-5 text-center">
            <div className="flex w-full flex-col items-center justify-center gap-5">
               <div className="flex h-40 w-40 items-center justify-center rounded-full bg-green-400">
                  <BsCheck size={100} className="m-0 p-0 text-green-700" />
               </div>
               <h2 className="text-2xl font-semibold text-text-black md:text-3xl">
                  Successful
               </h2>
               <p className="mt-2.5 max-w-[400px] text-sm text-text-gray md:text-base">
                  Congratulations! Your password has been changed. Click
                  continue to login.
               </p>
            </div>

            <Link
               to="/login"
               className="w-full rounded bg-green-500 py-2 uppercase text-white transition-all duration-300 hover:bg-green-400"
            >
               Continue
            </Link>
         </div>
      </AuthLayout>
   );
};
export default ResetPasswordSuccessPage;
