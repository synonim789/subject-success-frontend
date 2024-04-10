import { Link } from 'react-router-dom';
import notFoundImage from '/bro.svg';

const NotFound = () => {
   return (
      <section className="h-screen">
         <div className="flex h-full flex-col items-center justify-center  gap-10 px-5 font-bold">
            <img
               src={notFoundImage}
               className="h-[500px] w-fit"
               alt="Cat hanging from 0 in 404 number"
            />
            <Link
               to="/"
               className="w-fit rounded-full bg-green-house-500 px-10 py-5 text-3xl uppercase text-white transition-all duration-300 hover:bg-green-house-600"
            >
               Go Home
            </Link>
         </div>
      </section>
   );
};
export default NotFound;
