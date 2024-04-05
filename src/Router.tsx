import { createBrowserRouter } from 'react-router-dom';
import AnonymousRoute from './helpers/AnonymousRoute';
import ProtectedRoute from './helpers/ProtectedRoute';
import Dash from './pages/Dash/Dash';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage';
import LoginPage from './pages/Login/LoginPage';
import NotFound from './pages/NotFound/NotFound';
import OtpPage from './pages/OTP/OtpPage';
import SignUpPage from './pages/SignUp/SignUpPage';

export const router = createBrowserRouter([
   {
      errorElement: <NotFound />,
      children: [
         {
            element: <AnonymousRoute />,
            children: [
               {
                  path: '/login',

                  element: <LoginPage />,
               },
               {
                  path: '/sign-up',
                  element: <SignUpPage />,
               },
               {
                  path: '/forgot-password',
                  element: <ForgotPasswordPage />,
               },
               {
                  path: '/otp',
                  element: <OtpPage />,
               },
            ],
         },
      ],
   },
   {
      element: <ProtectedRoute />,
      children: [
         {
            path: '/',
            element: <Dash />,
         },
      ],
   },
]);
