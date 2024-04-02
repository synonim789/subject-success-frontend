import { ReactNode } from 'react'
import LoginGithub from '../components/LoginGithub'
import LoginGoogle from '../components/LoginGoogle'

type AuthLayout = {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayout) => {
  return (
    <section className="lg:flex">
      <div className="bg-wh min-h-screen flex flex-col justify-center items-center gap-5 lg:w-1/3 py-5">
        {children}
        <div className="flex items-center w-full px-16 my-4">
          <div className="flex-1 border-t-2 border-gray-300" />
          <span className="px-3 text-gray-500 bg-white">or</span>
          <div className="flex-1 border-t-2 border-gray-300" />
        </div>
        <div className="flex flex-col w-full px-5 md:flex-row md:items-center md:justify-center gap-5">
          <LoginGoogle />
          <LoginGithub />
        </div>
      </div>

      <div className="lg:w-2/3 auth-background hidden lg:block" />
    </section>
  )
}
export default AuthLayout
