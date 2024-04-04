import { setupServer } from 'msw/node';
import { handlers } from './serverHandlers';

export const mockServer = () => {
   const server = setupServer(...handlers);

   beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

   afterAll(() => server.close());

   afterEach(() => server.resetHandlers());

   return server;
};
