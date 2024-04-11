import { Dispatch, SetStateAction } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { formatDate } from '../utils/formatDate';

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
            <p className="transition hover:text-green-400">Hello, Oskar 👋</p>
         </div>
         <div className="flex items-center gap-5">
            <p className="group hidden items-center gap-2 text-lg md:flex">
               <BiCalendar className="transition group-hover:text-green-house-200" />
               <span className="text-base text-slate-400 transition group-hover:text-green-house-200 dark:text-white/50">
                  {currentDate}
               </span>
            </p>
            <button
               className="flex items-center justify-center gap-2"
               type="button"
            >
               <div className="size-6 rounded-full bg-white" />
               <p className="text-lg">Oskar</p>
               <MdKeyboardArrowDown className=" text-gray-400" />
            </button>
         </div>
      </nav>
   );
};
export default DashNavbar;
