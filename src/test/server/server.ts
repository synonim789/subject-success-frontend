import { setupServer } from 'msw/node'
import { handlers } from './serverHandlers'

export const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
