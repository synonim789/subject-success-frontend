import { FaGoogle } from 'react-icons/fa'
import getGoogleAuthUrl from '../utils/getGoogleAuthUrl'

const LoginGoogle = () => {
  const googleLink = getGoogleAuthUrl()

  return (
    <a
      href={googleLink}
      className="font-semibold text-text-gray border py-2.5 px-2.5 rounded-full border-[#CDD6E1] flex items-center justify-center gap-2 hover:scale-110 transition hover:border-green-900"
    >
      <FaGoogle className="text-red-500" />
      Log in with Google
    </a>
  )
}
export default LoginGoogle
