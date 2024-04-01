import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <section className="flex w-full">
      <Outlet />
      <div className="w-full">Backgroud will be here</div>
    </section>
  )
}
export default AuthLayout
