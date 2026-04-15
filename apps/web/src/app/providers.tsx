'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

// Providers globais do app (React Query, futuramente Auth, etc.)
export function Providers({ children }: { children: React.ReactNode }) {
  // Instância do QueryClient por componente para evitar estado compartilhado entre SSR requests
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
