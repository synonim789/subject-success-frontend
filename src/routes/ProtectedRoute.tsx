import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

const ProtectedRoute = () => {
   const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated,
   );

   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
