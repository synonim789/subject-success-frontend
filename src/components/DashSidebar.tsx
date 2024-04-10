import { useEffect } from 'react';
import { BsCheck } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineCancel } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../app/api/authApiSlice';
import { sidebarData } from '../data/sidebarData';

type Props = {
   className: string;
};

const DashSidebar = ({ className }: Props) => {
   const [sendLogout, { isSuccess }] = useSendLogoutMutation();
   const navigate = useNavigate();

   const handleLogout = () => {
      sendLogout();
   };

   useEffect(() => {
      if (isSuccess) {
         navigate('/login');
      }
   }, [isSuccess, navigate]);

   return (
      <div className={`${className} h-full`}>
         <div></div>
         <div className="flex items-center justify-between">
            <Link
               to="/"
               className="group ml-3 mt-4 flex items-center gap-3 text-xl font-extrabold text-slate-800   dark:text-white/85"
            >
               <span className="rounded-full border-2  border-white/85 transition-colors group-hover:border-green-house-400 group-hover:text-green-house-400">
                  <BsCheck />
               </span>{' '}
               <span className="transition-colors group-hover:text-green-house-400">
                  Subject Success
               </span>
            </Link>
            <button
               className="mt-4 block rounded-full p-3 text-xl text-slate-800 hover:bg-gray-300 md:hidden dark:text-white/85"
               type="button"
            >
               <MdOutlineCancel />
            </button>
         </div>
         <div className="mt-10 flex  flex-col justify-between">
            <div>
               {sidebarData.map((link) => (
                  <NavLink
                     key={link.name}
                     to={`/${link.name}`}
                     className="m-2 flex items-center gap-5 rounded-lg pb-2.5 pl-4 pt-3 text-lg text-gray-700 transition hover:bg-green-house-600 dark:text-white/60 dark:hover:text-white"
                  >
                     {link.icon}
                     <span className="capitalize">{link.name}</span>
                  </NavLink>
               ))}
            </div>
         </div>
         <div className="absolute bottom-5 flex w-full justify-center">
            <button
               className="flex items-center justify-center gap-2 text-center text-xl text-red-400 transition hover:text-red-500"
               type="button"
               onClick={handleLogout}
            >
               <CiLogout />
               <span>Logout</span>
            </button>
         </div>
      </div>
   );
};
export default DashSidebar;
