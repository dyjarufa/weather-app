import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

export function withQueryClient(ui: ReactNode) {
  const client = new QueryClient()
  return <QueryClientProvider client={client}>{ui}</QueryClientProvider>
}
