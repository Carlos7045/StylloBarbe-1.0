// Exportações do domínio de usuários

// Hooks
export { useAdminSaas } from './hooks/useAdminSaas'
export { useBarbeiro } from './hooks/useBarbeiro'
export { useCliente } from './hooks/useCliente'

// Services
export { adminSaasService } from './services/admin-saas.service'
export { barbeiroDashboardService } from './services/barbeiro-dashboard.service'
export { clienteDashboardService } from './services/cliente-dashboard.service'

// Types
export type * from './types/admin-saas'
export type * from './types/barbeiro-dashboard'
export type * from './types/cliente-dashboard'

// Componentes Admin SaaS
export * from './components/admin-saas'

// Componentes Barbeiro
export * from './components/barbeiro'

// Componentes Cliente
export * from './components/cliente'