type SubmitButton = {
  text: string
}

const SubmitButton = ({ text }: SubmitButton) => {
  return (
    <button className="bg-green-500 uppercase w-full py-2 rounded text-white hover:bg-green-400 transition-all duration-300">
      {text}
    </button>
  )
}
export default SubmitButton
