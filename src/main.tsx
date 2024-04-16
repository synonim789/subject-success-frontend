import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { setupStore } from './app/store.ts';
import './index.css';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
   <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <Provider store={store}>
         <App />
      </Provider>
   </>,
);
