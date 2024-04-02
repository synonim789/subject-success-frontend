import { ReactNode } from 'react'

type AuthLayout = {
  children: ReactNode
}

const AuthLayout = ({ children }: AuthLayout) => {
  return (
    <section className="lg:flex">
      <div className="bg-wh min-h-screen flex flex-col justify-center items-center gap-5 lg:w-1/3">
        {children}
      </div>

      <div className="lg:w-2/3 auth-background hidden lg:block" />
    </section>
  )
}
export default AuthLayout
