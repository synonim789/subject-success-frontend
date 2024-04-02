import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { MdAlternateEmail } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../app/api/authApiSlice'
import { setUser } from '../../app/slices/authSlice'
import Input from '../../components/Input'
import SubmitButton from '../../components/SubmitButton'
import { LoginFields, loginSchema } from '../../types/loginSchema'
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({ resolver: zodResolver(loginSchema) })

  if (isLoading) {
    return <p>Loding...</p>
  }

  const submitHandler: SubmitHandler<LoginFields> = async (data) => {
    try {
      const accessToken = await login({
        email: data.email,
        password: data.password,
      }).unwrap()
      dispatch(setUser({ accessToken: accessToken }))
      navigate('/')
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = (err as { data: { message: string } }).data.message
        toast.error(errMsg)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className="w-full px-5">
        <Input
          type="email"
          placeholder="Enter your email..."
          label="Email adress"
          name="email"
          id="email"
          icon={<MdAlternateEmail size={20} />}
          register={{ ...register('email') }}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="**********"
          label="Password"
          name="password"
          id="password"
          isPassword={true}
          register={{ ...register('password') }}
          error={errors.password}
        />
        <SubmitButton text="login" disabled={isSubmitting} />
        {error && (
          <p className="text-left text-red-500 font-semibold mt-2">
            {'status' in error
              ? (error as { data: { message: string } }).data.message
              : error.message}
          </p>
        )}
      </form>
    </>
  )
}
export default LoginForm
