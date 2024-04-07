import { FaGoogle } from 'react-icons/fa';
import getGoogleAuthUrl from '../utils/getGoogleAuthUrl';

const LoginGoogle = () => {
   const googleLink = getGoogleAuthUrl();

   return (
      <a
         href={googleLink}
         className="flex items-center justify-center gap-2 rounded-full border border-[#CDD6E1] px-2.5 py-2.5 font-semibold text-text-gray transition hover:scale-110 hover:border-green-house-600 hover:text-green-house-600 dark:border-slate-600"
      >
         <FaGoogle className="text-red-500" />
         Log in with Google
      </a>
   );
};
export default LoginGoogle;
