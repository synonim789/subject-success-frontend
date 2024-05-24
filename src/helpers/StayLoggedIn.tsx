import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshMutation } from '../app/api/authApiSlice';
import { RootState } from '../app/store';

const StayLoggedIn = () => {
   const [refresh, { isLoading, isError, isSuccess, isUninitialized }] =
      useRefreshMutation();
   const [trueSuccess, setTrueSuccess] = useState(false);
   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

   useEffect(() => {
      const verifyRefreshToken = async () => {
         try {
            await refresh();
            setTrueSuccess(true);
         } catch (error) {
            console.log(error);
         }
      };
      if (!isAuthenticated) verifyRefreshToken();
   }, [refresh, isAuthenticated]);

   if (isLoading) {
      return <p>Loading...</p>;
   } else if (isError) {
      return <Navigate to="/login" />;
   } else if (isSuccess && trueSuccess) {
      return <Outlet />;
   } else if (isAuthenticated && isUninitialized) {
      return <Outlet />;
   }
};
export default StayLoggedIn;
