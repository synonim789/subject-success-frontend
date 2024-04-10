import { Outlet } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';
import DashSidebar from '../components/DashSidebar';

const DashLayout = () => {
   return (
      <div className="relative flex">
         <div className="fixed w-80 dark:bg-dark-800">
            <DashSidebar className="relative ml-3 h-screen overflow-auto pb-10 md:overflow-hidden md:hover:overflow-auto" />
         </div>
         <div className="min-h-screen w-full md:ml-80">
            <div className="fixed w-full bg-dark-900 md:static">
               <DashNavbar className="relative flex justify-between p-2 text-white/85 md:mx-6" />
               <div>
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
};
export default DashLayout;
