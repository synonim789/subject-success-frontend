import { Dispatch, SetStateAction } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { formatDate } from '../utils/formatDate';
import NavbarDropdown from './NavbarDropdown';

type Props = {
   className: string;
   sidebarVisible: boolean;
   setSidebarVisible: Dispatch<SetStateAction<boolean>>;
};

const DashNavbar = ({
   className,
   sidebarVisible,
   setSidebarVisible,
}: Props) => {
   const currentDate = formatDate(new Date());

   return (
      <nav className={`${className} text-2xl`}>
         <div className="flex items-center gap-2 ">
            <button
               type="button"
               className="p-3 transition hover:text-green-400"
               onClick={() => setSidebarVisible(!sidebarVisible)}
            >
               <AiOutlineMenu />
            </button>
            <p className="hidden transition hover:text-green-400 md:block">
               Hello, Oskar 👋
            </p>
         </div>
         <div className="flex items-center gap-5">
            <p className="group hidden items-center gap-2 text-lg md:flex">
               <BiCalendar className="transition group-hover:text-green-house-200" />
               <span className="text-base text-slate-400 transition group-hover:text-green-house-200 dark:text-white/50">
                  {currentDate}
               </span>
            </p>
            <NavbarDropdown />
         </div>
      </nav>
   );
};
export default DashNavbar;
