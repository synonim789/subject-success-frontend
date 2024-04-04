type SubmitButton = {
   text: string;
   disabled: boolean;
};

const SubmitButton = ({ text, disabled }: SubmitButton) => {
   return (
      <button
         className="w-full rounded bg-green-500 py-2 uppercase text-white transition-all duration-300 hover:bg-green-400"
         disabled={disabled}
         type="submit"
      >
         {text}
      </button>
   );
};
export default SubmitButton;
