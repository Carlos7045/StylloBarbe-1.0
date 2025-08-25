// Hook para gerenciamento de autenticação
import { useAuthContext } from '../components/AuthProvider'
import { LoginCredentials, RegisterData } from '../types'

export function useAuth() {
  const context = useAuthContext()

  return {
    // Estado
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    error: context.error,
    
    // Ações
    login: async (credentials: LoginCredentials) => {
      await context.login(credentials)
    },
    
    register: async (data: RegisterData) => {
      await context.register(data)
    },
    
    logout: () => {
      context.logout()
    },
    
    clearError: () => {
      context.clearError()
    }
  }
}