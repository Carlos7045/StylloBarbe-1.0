// Exportações do domínio de autenticação

// Componentes
export { AuthProvider } from './components/AuthProvider'
export { RoleBasedRedirect, useRoleBasedRedirect } from './components/RoleBasedRedirect'
export { 
  ProtectedRoute, 
  AdminOnlyRoute, 
  AdminSaasOnlyRoute, 
  BarbershopStaffRoute 
} from './components/ProtectedRoute'

// Hooks
export { useAuth } from './hooks/useAuth'
export { useUser } from './hooks/useUser'

// Tipos
export type {
  LoginCredentials,
  RegisterData,
  AuthState,
  AuthContextType,
  RouteConfig
} from './types'

export {
  ROLE_REDIRECTS,
  PUBLIC_ROUTES,
  PROTECTED_ROUTES
} from './types'

// Serviços
export { authService } from './services/authService'