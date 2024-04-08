import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

const ProtectedRoute = () => {
   const token = useSelector((state: RootState) => state.auth.token);

   return token ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
