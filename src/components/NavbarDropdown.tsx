import { useEffect, useRef, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../app/api/authApiSlice';

const NavbarDropdown = () => {
   const [showDropdown, setShowDropdown] = useState(false);
   const [sendLogout, { isSuccess }] = useSendLogoutMutation();
   const dropdownMenu = useRef<HTMLDivElement>(null);
   const navigate = useNavigate();

   const handleLogout = () => {
      sendLogout();
   };

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

   return (
      <div className="relative">
         <button
            className="group flex items-center justify-center gap-2 rounded-lg p-2 hover:bg-green-600 "
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
         >
            <div className="size-6 rounded-full bg-white transition" />
            <p className="text-lg transition group-hover:text-white">Oskar</p>
            <MdKeyboardArrowDown className=" text-gray-400 transition group-hover:text-white" />
         </button>
         {showDropdown && (
            <div
               className="absolute right-0 z-10 mt-2 w-full  divide-y divide-gray-100 rounded-md bg-white shadow-lg  dark:bg-dark-500"
               ref={dropdownMenu}
            >
               <div className="py-2">
                  <Link
                     to="/profile"
                     className="block px-4 py-2 text-base transition hover:bg-gray-100 dark:hover:bg-dark-200"
                     onClick={() => setShowDropdown(false)}
                  >
                     Profile
                  </Link>
                  <button
                     className="flex w-full items-center gap-2 px-4 py-2 text-left text-base text-red-400 transition-none hover:bg-gray-100 dark:hover:bg-dark-200"
                     type="button"
                     onClick={handleLogout}
                  >
                     <CiLogout />
                     <span>Logout</span>
                  </button>
                  <div>Test</div>
               </div>
            </div>
         )}
      </div>
   );
};
export default NavbarDropdown;
