import env from './cleanEnv';

const getGithubAuthUrl = () => {
   const rootUrl = 'https://github.com/login/oauth/authorize';
   const path = '/';
   const options = {
      client_id: env.VITE_GITHUB_CLIENT_ID,
      redirect_uri: env.VITE_GITHUB_REDIRECT_URL,
   };

   const qs = new URLSearchParams(options);

   console.log(qs)

   return `${rootUrl}?${qs.toString()}?path=${path}&scope=user:email`;
};

export default getGithubAuthUrl;
