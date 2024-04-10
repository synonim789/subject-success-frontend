import { FaGithub } from 'react-icons/fa';
import getGithubAuthUrl from '../utils/getGithubAuthUrl';

const LoginGithub = () => {
   const githubLink = getGithubAuthUrl();

   return (
      <a
         href={githubLink}
         className="flex items-center justify-center gap-2 rounded-full border border-[#CDD6E1] px-2.5 py-2.5 font-semibold text-text-gray transition hover:scale-110 hover:border-green-house-600 hover:text-green-house-600 dark:border-slate-600"
      >
         <FaGithub className="text-blue-500 dark:text-blue-400" />
         Login with Github
      </a>
   );
};
export default LoginGithub;
