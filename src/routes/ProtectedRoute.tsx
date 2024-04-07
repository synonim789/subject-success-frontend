import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

const ProtectedRoute = () => {
   const token = useSelector((state: RootState) => state.auth.token);

   if (!token) {
      return <Navigate to="/login" />;
   }

   return <Outlet />;
};
export default ProtectedRoute;
