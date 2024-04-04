import { ReactNode } from 'react';
import LoginGithub from '../components/LoginGithub';
import LoginGoogle from '../components/LoginGoogle';

type AuthLayout = {
   children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayout) => {
   return (
      <section className="lg:flex">
         <div className="bg-wh flex min-h-screen flex-col items-center justify-center gap-5 py-5 lg:w-1/3">
            {children}
            <div className="my-4 flex w-full items-center px-16">
               <div className="flex-1 border-t-2 border-gray-300" />
               <span className="bg-white px-3 text-gray-500">or</span>
               <div className="flex-1 border-t-2 border-gray-300" />
            </div>
            <div className="flex w-full flex-col gap-5 px-5 md:flex-row md:items-center md:justify-center">
               <LoginGoogle />
               <LoginGithub />
            </div>
         </div>

         <div className="auth-background hidden lg:block lg:w-2/3" />
      </section>
   );
};
export default AuthLayout;
