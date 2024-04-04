type SubmitButton = {
  text: string
  disabled: boolean
}

const SubmitButton = ({ text, disabled }: SubmitButton) => {
  return (
    <button
      className="bg-green-500 uppercase w-full py-2 rounded text-white hover:bg-green-400 transition-all duration-300"
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  )
}
export default SubmitButton
