import env from './cleanEnv';

const getGithubAuthUrl = () => {
   const rootUrl = 'https://github.com/login/oauth/authorize';
   const path = '/';
   const options = {
      client_id: env.VITE_GITHUB_CLIENT_ID,
      redirect_uri: env.VITE_GITHUB_REDIRECT_URL,
   };
   console.log(options);
   const qs = new URLSearchParams(options);

   return `${rootUrl}?${qs.toString()}?path=${path}&scope=user:email`;
};

export default getGithubAuthUrl;
