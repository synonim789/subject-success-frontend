import { useEffect } from 'react'
import './App.css'
import getGithubAuthUrl from './utils/getGithubAuthUrl'
import getGoogleAuthUrl from './utils/getGoogleAuthUrl'

function App() {
  useEffect(() => {
    console.log('UseEffect Called', Date.now())
  }, [])

  return (
    <div className="flex">
      <a href={getGoogleAuthUrl()}>Log in by Google</a>
      <a href={getGithubAuthUrl()}>Log in by GitHub</a>
      <form className="flex">
        <input type="email" autoComplete="email" />
        <input type="password" autoComplete="current-password" />
      </form>

      <button>Log in</button>
    </div>
  )
}

export default App
