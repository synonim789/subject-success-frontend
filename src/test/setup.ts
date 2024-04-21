import '@testing-library/jest-dom';
import { server } from './server/server';

Object.defineProperty(window, 'matchMedia', {
   writable: true,
   value: (query: unknown) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
   }),
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());

afterEach(() => {
   server.resetHandlers();
});
