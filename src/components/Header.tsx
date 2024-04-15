type Props = {
   text: string;
};

const Header = ({ text }: Props) => {
   return (
      <header className="mb-5  w-full rounded-xl bg-white px-5  py-8 drop-shadow-xl dark:bg-dark-700">
         <h2 className="text-4xl capitalize text-slate-500 dark:text-white/85">
            {text}
         </h2>
      </header>
   );
};
export default Header;
