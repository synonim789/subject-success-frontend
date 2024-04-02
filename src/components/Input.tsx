import { ReactNode, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

type Input = {
  label: string
  placeholder: string
  icon?: ReactNode
  id: string
  name: string
  type: string
  isPassword?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  error?: FieldError
}

const Input = ({
  label,
  placeholder,
  icon,
  id,
  name,
  type,
  isPassword,
  register,
  error,
}: Input) => {
  const [isPasswordVisible, setIsPassowrdVisible] = useState(false)

  const togglePasswordVisibilty = () => {
    setIsPassowrdVisible(!isPasswordVisible)
  }

  return (
    <div className="text-left">
      <label
        htmlFor={id}
        className={`${error ? 'text-red-500' : 'text-gray-400'} font-medium`}
      >
        {label}
      </label>
      <div className="flex flex-col text-left w-full mb-4 relative mt-1 ">
        <input
          type={isPassword ? (isPasswordVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          name={name}
          id={id}
          className={`${
            error ? 'border-red-500 border-2' : 'border-[#CDD6E1] '
          }  border rounded-md py-3 pl-5 pr-3 outline-none`}
          {...register}
        />
        {isPassword && (
          <button
            className="absolute flex items-center text-gray-600 right-3 inset-y-0"
            onClick={togglePasswordVisibilty}
            type="button"
          >
            {isPasswordVisible ? (
              <IoMdEye size={20} />
            ) : (
              <IoMdEyeOff size={20} />
            )}
          </button>
        )}

        {icon && (
          <div className="absolute flex items-center text-gray-600 right-3 inset-y-0">
            {icon}
          </div>
        )}
      </div>
      {error?.message && (
        <div className="text-red-500 my-2 text-justify font-semibold">
          {error.message}
        </div>
      )}
    </div>
  )
}
export default Input
