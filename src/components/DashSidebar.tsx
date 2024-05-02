import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { BsCheck } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineCancel } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../app/api/authApiSlice';
import { sidebarData } from '../data/sidebarData';

type Props = {
   className: string;
   sidebarVisible: boolean;
   setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashSidebar = ({
   className,
   sidebarVisible,
   setSidebarVisible,
}: Props) => {
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
      <nav className={`${className} h-full`}>
         <AnimatePresence>
            {sidebarVisible && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center justify-between">
                     <NavLink
                        to="/"
                        className={({ isActive }) =>
                           isActive
                              ? 'group ml-3 mt-4 flex items-center gap-3 border-green-house-400 text-xl font-extrabold text-green-400 dark:text-white/85'
                              : 'group ml-3 mt-4 flex items-center gap-3 text-xl font-extrabold text-slate-500   dark:text-white/85'
                        }
                     >
                        <span className="rounded-full border-2  border-slate-500 transition-colors group-hover:border-green-house-600 group-hover:text-green-house-600 dark:border-white/85">
                           <BsCheck />
                        </span>{' '}
                        <span className="transition-colors group-hover:text-green-house-400">
                           Subject Success
                        </span>
                     </NavLink>
                     <button
                        className="mr-2 mt-4 block rounded-full p-3 text-2xl text-slate-800 hover:bg-gray-300 md:hidden dark:text-white/85"
                        type="button"
                        onClick={() => setSidebarVisible(!sidebarVisible)}
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
                              className={({ isActive }) =>
                                 isActive
                                    ? 'm-2 flex items-center gap-5 rounded-lg bg-green-house-400 pb-2.5 pl-4 pt-3 text-lg text-white transition hover:bg-green-house-600 dark:text-white/60'
                                    : 'm-2 flex items-center gap-5 rounded-lg pb-2.5 pl-4 pt-3 text-lg text-gray-700 transition hover:bg-green-house-600 hover:text-white dark:text-white/60'
                              }
                           >
                              {link.icon}
                              <span className="capitalize">{link.name}</span>
                           </NavLink>
                        ))}
                     </div>
                  </div>
                  <div className="absolute bottom-5 left-0 right-0 mx-auto">
                     <button
                        className="flex w-full items-center justify-center gap-2 text-xl font-semibold text-red-500 transition hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
                        type="button"
                        onClick={handleLogout}
                     >
                        <CiLogout />
                        <span>Logout</span>
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </nav>
   );
};
export default DashSidebar;
