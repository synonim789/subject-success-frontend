import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import App from './App.tsx'
import store from './app/store.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="top-center" reverseOrder={true} />
    <Provider store={store}>
      <App />
    </Provider>
  </>
)
