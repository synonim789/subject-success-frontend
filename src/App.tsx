import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';

const App = () => {
   return (
      <main className="bg-[#F4F3F2] dark:bg-[#121212]">
         <RouterProvider router={router} />
      </main>
   );
};
export default App;
