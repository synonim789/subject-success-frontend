import { Link } from 'react-router-dom'
import AuthLayout from '../../layout/AuthLayout'
import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center text-center w-full px-2">
        <h3 className="text-2xl md:text-3xl font-semibold text-text-black">
          Welcome to Subject Success
        </h3>
        <p className="text-text-gray text-sm md:text-base mt-2.5">
          Welcome back! login with your data that you entered during
          registration.
        </p>
        <span className="font-medium my-3 text-lg">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </span>
        <LoginForm />
      </div>
    </AuthLayout>
  )
}
export default LoginPage
