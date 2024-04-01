import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Dash from './pages/Dash/Dash'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import SignUp from './pages/SignUp/SignUp'
import AnonymousRoute from './helpers/AnonymousRoute'
import ProtectedRoute from './helpers/ProtectedRoute'

export const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      {
        element: <AnonymousRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: '/login',
                element: <Login />,
              },
              {
                path: '/sign-up',
                element: <SignUp />,
              },
              {
                path: '/forgot-password',
                element: <ForgotPassword />,
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
    ],
  },
])
