import { motion } from 'framer-motion';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashNavbar from '../components/DashNavbar';
import DashSidebar from '../components/DashSidebar';

const DashLayout = () => {
   const [sidebarVisible, setSidebarVisible] = useState(true);

   return (
      <div className="relative flex">
         <motion.div
            initial={false}
            animate={{
               width: sidebarVisible ? 320 : 0,
            }}
            className={`fixed z-10 bg-white dark:bg-dark-800`}
         >
            <DashSidebar
               className="relative h-screen overflow-auto pb-10 pl-3 shadow-2xl md:hover:overflow-auto"
               sidebarVisible={sidebarVisible}
               setSidebarVisible={setSidebarVisible}
            />
         </motion.div>
         <div
            className={`${sidebarVisible ? 'md:ml-80' : 'flex-2'} min-h-screen w-full`}
         >
            <div className="static  w-full dark:bg-dark-900">
               <DashNavbar
                  className="relative flex items-center justify-between p-2 text-slate-800 md:mx-6 dark:text-white/85"
                  sidebarVisible={sidebarVisible}
                  setSidebarVisible={setSidebarVisible}
               />
               <section className="p-10">
                  <Outlet />
               </section>
            </div>
         </div>
      </div>
   );
};
export default DashLayout;
