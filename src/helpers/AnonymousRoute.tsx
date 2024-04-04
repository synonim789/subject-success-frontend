import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

const AnonymousRoute = () => {
   const token = useSelector((state: RootState) => state.auth.token);
   return token ? <Navigate to="/" /> : <Outlet />;
};

export default AnonymousRoute;
