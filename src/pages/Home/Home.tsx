import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex justify-between mx-5">
      <Link to="login" className="text-2xl">
        Login
      </Link>
      <Link to="sign-up" className="text-2xl">
        Sign Up
      </Link>
    </div>
  )
}
export default Home
