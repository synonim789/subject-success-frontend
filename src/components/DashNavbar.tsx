type DashNavbar = {
   className: string;
};

const DashNavbar = ({ className }: DashNavbar) => {
   return <div className={`${className}`}>DashNavbar</div>;
};
export default DashNavbar;
