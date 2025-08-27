// Tipos para o sistema de autenticação
import { UserRole, AuthUser } from '@/shared/types'

export interface LoginCredentials {
  email: string
  senha: string
}

export interface RegisterData {
  nome: string
  email: string
  telefone: string
  cpf?: string
  senha: string
  confirmarSenha: string
  role: UserRole
  barbeariaId?: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  clearError: () => void
}

export interface RouteConfig {
  path: string
  allowedRoles: UserRole[]
  redirectTo?: string
}

// Mapeamento de redirecionamento por role
export const ROLE_REDIRECTS: Record<UserRole, string> = {
  admin_saas: '/admin-saas',
  admin_barbearia: '/admin-barbearia',
  barbeiro: '/barbeiro',
  cliente: '/cliente'
}

// Rotas públicas que não precisam de autenticação
export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/cadastro',
  '/agendamento',
  '/recuperar-senha'
]

// Configuração de proteção de rotas
export const PROTECTED_ROUTES: RouteConfig[] = [
  {
    path: '/admin-saas',
    allowedRoles: ['admin_saas']
  },
  {
    path: '/admin-barbearia',
    allowedRoles: ['admin_barbearia']
  },
  {
    path: '/barbeiro',
    allowedRoles: ['barbeiro']
  },
  {
    path: '/cliente',
    allowedRoles: ['cliente']
  }
]