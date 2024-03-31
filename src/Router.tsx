import { createBrowserRouter } from 'react-router-dom'
import Dash from './pages/Dash/Dash'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import SignUp from './pages/SignUp/SignUp'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
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
  {
    path: '/dash',
    element: <Dash />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
