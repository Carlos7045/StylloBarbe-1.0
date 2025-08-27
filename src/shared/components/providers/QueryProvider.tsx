'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Com SSR, geralmente queremos definir um staleTime padrão
            // acima de 0 para evitar refetch imediato no cliente
            staleTime: 60 * 1000, // 1 minuto
            retry: (failureCount, error) => {
              // Não tentar novamente para erros 404
              if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
                return false
              }
              // Tentar até 3 vezes para outros erros
              return failureCount < 3
            },
          },
          mutations: {
            retry: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}