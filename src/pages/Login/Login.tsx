import getGithubAuthUrl from '../../utils/getGithubAuthUrl'
import getGoogleAuthUrl from '../../utils/getGoogleAuthUrl'

const Login = () => {
  return (
    <div className="dark:bg-black min-h-screen flex flex-col justify-center items-center gap-5">
      <div className="dark:text-white space-x-5">
        <a href={getGoogleAuthUrl()}>Log in by Google</a>
        <a href={getGithubAuthUrl()}>Log in by GitHub</a>
      </div>

      <form className="flex flex-col gap-5 w-fit">
        <input
          type="email"
          autoComplete="email"
          className="dark:bg-gray-600 py-1 px-3"
          placeholder="email"
        />
        <input
          type="password"
          autoComplete="current-password"
          className="dark:bg-gray-600 py-1 px-3"
          placeholder="password"
        />
        <button className="dark:bg-white py-1 px-3 rounded-full">Log in</button>
      </form>
    </div>
  )
}
export default Login
