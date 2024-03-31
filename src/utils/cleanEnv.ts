import { cleanEnv, str } from 'envalid'

export default cleanEnv(import.meta.env, {
  VITE_GOOGLE_CLIENT_ID: str(),
  VITE_GOOGLE_REDIRECT_URL: str(),
  VITE_SERVER_ENDPOINT: str(),
  VITE_GITHUB_CLIENT_ID: str(),
  VITE_GITHUB_REDIRECT_URL: str(),
  VITE_BACKEND_SERVER_URL: str(),
})
