import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/server'

// MSW
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock Date, fetch, etc. se precisar
