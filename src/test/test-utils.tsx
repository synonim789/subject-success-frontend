import { RenderOptions, render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../app/store';

const AllProdivers = ({ children }: { children: ReactNode }) => (
   <>
      <Toaster />
      <Provider store={store}>
         <BrowserRouter>{children}</BrowserRouter>
      </Provider>
   </>
);

const customRender = (
   ui: ReactElement,
   options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProdivers, ...options });

export * from '@testing-library/react';
export { customRender as render };
