import { RenderOptions, render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppStore, RootState, setupStore } from '../app/store';

interface ExtenderRenderOptions extends Omit<RenderOptions, 'queries'> {
   preloadedState?: Partial<RootState>;
   store?: AppStore;
}

const customRender = (
   ui: ReactElement,
   {
      preloadedState = {},
      store = setupStore(preloadedState),
      ...renderOptions
   }: ExtenderRenderOptions = {},
) => {
   const Wrapper = ({ children }: { children: ReactNode }) => {
      return (
         <>
            <Toaster />
            <Provider store={store}>
               <BrowserRouter>{children}</BrowserRouter>
            </Provider>
         </>
      );
   };
   return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
