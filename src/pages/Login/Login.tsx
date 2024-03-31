import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../app/api/authApiSlice'
import { setUser } from '../../app/api/authSlice'
import getGithubAuthUrl from '../../utils/getGithubAuthUrl'
import getGoogleAuthUrl from '../../utils/getGoogleAuthUrl'

const Login = () => {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  if (isLoading) {
    return <p>Loding...</p>
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const accessToken = await login({ email: email, password: pwd }).unwrap()
      dispatch(setUser({ accessToken: accessToken }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPwd(e.target.value)

  return (
    <div className="dark:bg-black min-h-screen flex flex-col justify-center items-center gap-5">
      <div className="dark:text-white space-x-5">
        <a href={getGoogleAuthUrl()}>Log in by Google</a>
        <a href={getGithubAuthUrl()}>Log in by GitHub</a>
      </div>

      <form className="flex flex-col gap-5 w-fit" onSubmit={handleSubmit}>
        <input
          type="email"
          autoComplete="email"
          className="dark:bg-gray-600 py-1 px-3"
          placeholder="email"
          onChange={handleEmail}
        />
        <input
          type="password"
          autoComplete="current-password"
          className="dark:bg-gray-600 py-1 px-3"
          placeholder="password"
          onChange={handlePassword}
        />
        <button className="dark:bg-white py-1 px-3 rounded-full" type="submit">
          Log in
        </button>
      </form>
    </div>
  )
}
export default Login
