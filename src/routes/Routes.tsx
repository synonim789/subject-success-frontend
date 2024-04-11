import { createBrowserRouter } from 'react-router-dom';
import StayLoggedIn from '../helpers/StayLoggedIn';
import DashLayout from '../layout/DashLayout';
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPasswordPage';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import NotFound from '../pages/NotFound/NotFound';
import OtpPage from '../pages/OTP/OtpPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import ResetPasswordPage from '../pages/ResetPassword/ResetPasswordPage';
import ResetPasswordSuccessPage from '../pages/ResetPasswordSuccess/ResetPasswordSuccessPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import SubjectsPage from '../pages/Subjects/SubjectsPage';
import TasksPage from '../pages/Tasks/TasksPage';
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
         {
            element: <StayLoggedIn />,
            children: [
               {
                  element: <ProtectedRoute />,
                  children: [
                     {
                        element: <DashLayout />,
                        children: [
                           {
                              element: <HomePage />,
                              path: '/',
                           },
                           {
                              element: <SubjectsPage />,
                              path: '/subjects',
                           },
                           {
                              element: <TasksPage />,
                              path: '/tasks',
                           },
                           {
                              element: <ProfilePage />,
                              path: '/profile',
                           },
                        ],
                     },
                  ],
               },
            ],
         },
      ],
   },
]);
