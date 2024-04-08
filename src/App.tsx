import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';

const App = () => {
   return (
      <main className=" min-h-screen w-full dark:bg-[#121212]">
         <RouterProvider router={router} />
      </main>
   );
};
export default App;
