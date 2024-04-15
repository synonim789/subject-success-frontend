import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

const AnonymousRoute = () => {
   const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated,
   );
   return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default AnonymousRoute;
