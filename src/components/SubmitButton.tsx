type Props = {
   text: string;
   disabled: boolean;
};

const SubmitButton = ({ text, disabled }: Props) => {
   return (
      <button
         className="w-full rounded bg-green-house-500 py-2 uppercase text-white transition-all duration-300 hover:bg-green-house-600"
         disabled={disabled}
         type="submit"
      >
         {text}
      </button>
   );
};
export default SubmitButton;
