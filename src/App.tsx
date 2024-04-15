import { RouterProvider } from 'react-router-dom';
import { useDarkMode } from './hooks/useDarkMode';
import { router } from './routes/Routes';

const App = () => {
   useDarkMode();
   return (
      <main className="bg-[#F4F3F2] dark:bg-[#121212]">
         <RouterProvider router={router} />
      </main>
   );
};
export default App;
