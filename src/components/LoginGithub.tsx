import { FaGithub } from 'react-icons/fa'
import getGithubAuthUrl from '../utils/getGithubAuthUrl'

const LoginGithub = () => {
  const githubLink = getGithubAuthUrl()

  return (
    <a
      href={githubLink}
      className="font-semibold text-text-gray border py-2.5 px-2.5 rounded-full border-[#CDD6E1] flex items-center justify-center gap-2 hover:scale-110 transition hover:border-green-900"
    >
      <FaGithub className="text-blue-800" />
      Login with Github
    </a>
  )
}
export default LoginGithub
