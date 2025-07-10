import type { ReactNode } from 'react'

export function ErrorBanner({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-2 text-sm text-red-700">
      {children}
    </div>
  )
}
