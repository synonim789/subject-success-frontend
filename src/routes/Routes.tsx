import { createBrowserRouter } from 'react-router-dom';
import Dash from '../pages/Dash/Dash';
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPasswordPage';
import LoginPage from '../pages/Login/LoginPage';
import NotFound from '../pages/NotFound/NotFound';
import OtpPage from '../pages/OTP/OtpPage';
import ResetPasswordPage from '../pages/ResetPassword/ResetPasswordPage';
import ResetPasswordSuccessPage from '../pages/ResetPasswordSuccess/ResetPasswordSuccessPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import AnonymousRoute from './AnonymousRoute';
import ProtectedRoute from './ProtectedRoute';

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
               {
                  path: '/reset-password',
                  element: <ResetPasswordPage />,
               },
               {
                  path: '/reset-password-success',
                  element: <ResetPasswordSuccessPage />,
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
