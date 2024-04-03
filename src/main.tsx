import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.tsx'
import  store  from './app/store.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="top-center" reverseOrder={true} />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
)
