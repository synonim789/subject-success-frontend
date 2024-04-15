import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { LuMoon, LuSun } from 'react-icons/lu';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../app/api/authApiSlice';
import { useGetUserQuery } from '../app/api/userApiSlice';
import { useDarkMode } from '../hooks/useDarkMode';
import ProfileImagePlaceholder from '/profile-placeholder.jpg';

const NavbarDropdown = () => {
   const [showDropdown, setShowDropdown] = useState(false);
   const [sendLogout, { isSuccess }] = useSendLogoutMutation();
   const dropdownMenu = useRef<HTMLDivElement>(null);
   const navigate = useNavigate();
   const [isDarkMode, setIsDarkMode] = useDarkMode();
   const { data, isLoading, isError } = useGetUserQuery();

   useEffect(() => {
      if (isSuccess) {
         navigate('/login');
      }
   }, [isSuccess, navigate]);

   useEffect(() => {
      const handler = (e: TouchEvent | MouseEvent) => {
         if (!dropdownMenu.current?.contains(e.target as Node)) {
            setShowDropdown(false);
         }
      };

      document.addEventListener('mousedown', handler);

      return () => document.removeEventListener('mousedown', handler);
   });

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (isError) {
      return <p>error</p>;
   }

   const handleLogout = () => {
      sendLogout();
   };

   return (
      <div className="relative" ref={dropdownMenu}>
         <button
            className="group flex items-center justify-center gap-2 rounded-lg p-2 hover:bg-green-600 "
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
         >
            {data?.picture ? (
               <img
                  src={data.picture}
                  alt="piture"
                  className=" size-6 rounded-full"
                  referrerPolicy="no-referrer"
               />
            ) : (
               <img
                  src={ProfileImagePlaceholder}
                  className="size-6 rounded-full  transition"
               />
            )}

            <p className="text-lg transition group-hover:text-white">
               {data?.username}
            </p>
            <MdKeyboardArrowDown className=" text-gray-400 transition group-hover:text-white" />
         </button>
         <AnimatePresence>
            {showDropdown && (
               <motion.div
                  className="absolute right-0 z-10 mt-2 w-52 divide-y  divide-gray-100 rounded-md bg-white shadow-lg  dark:bg-dark-500"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 1 }}
               >
                  <div className="py-2">
                     <Link
                        to="/profile"
                        className="block px-4 py-2 text-base transition hover:bg-gray-100 dark:hover:bg-dark-200"
                        onClick={() => setShowDropdown(false)}
                     >
                        Profile
                     </Link>
                     <div className="flex items-center gap-2 px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-dark-200">
                        <label
                           htmlFor="check"
                           className="relative block h-8 w-16 cursor-pointer rounded-full bg-gray-100 dark:bg-dark-900"
                        >
                           <input
                              type="checkbox"
                              className="peer sr-only"
                              name="check"
                              id="check"
                              checked={isDarkMode}
                              onChange={(e) => setIsDarkMode(e.target.checked)}
                           />
                           <span className="absolute left-1 top-1 flex items-center justify-center rounded-full bg-black  transition-all duration-500 peer-checked:left-9 peer-checked:bg-[#F4F3F2]">
                              {isDarkMode ? (
                                 <LuMoon className="p-1 text-dark-900" />
                              ) : (
                                 <LuSun className="p-1 text-white" />
                              )}
                           </span>
                        </label>
                        <p className="text-base">Dark mode</p>
                     </div>

                     <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-base font-bold text-red-400 transition-none hover:bg-gray-100 dark:hover:bg-dark-200"
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
      </div>
   );
};
export default NavbarDropdown;
