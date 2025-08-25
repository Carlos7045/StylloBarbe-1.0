// Hook para gerenciamento de dados do usuário
import { useAuthContext } from '../components/AuthProvider'
import { AuthUser, UserRole } from '@/shared/types'

export function useUser() {
  const { user, isAuthenticated } = useAuthContext()

  // Verifica se o usuário tem uma role específica
  const hasRole = (role: UserRole): boolean => {
    return user?.role === role
  }

  // Verifica se o usuário tem uma das roles especificadas
  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false
  }

  // Verifica se é admin (SaaS ou Barbearia)
  const isAdmin = (): boolean => {
    return hasAnyRole(['admin_saas', 'admin_barbearia'])
  }

  // Verifica se pertence a uma barbearia específica
  const belongsToBarbershop = (barbeariaId: string): boolean => {
    return user?.barbeariaId === barbeariaId
  }

  // Verifica se pode acessar dados de uma barbearia
  const canAccessBarbershop = (barbeariaId: string): boolean => {
    // Admin SaaS pode acessar qualquer barbearia
    if (hasRole('admin_saas')) {
      return true
    }
    
    // Admin barbearia e barbeiro só podem acessar sua própria barbearia
    if (hasAnyRole(['admin_barbearia', 'barbeiro'])) {
      return belongsToBarbershop(barbeariaId)
    }
    
    return false
  }

  return {
    // Dados do usuário
    user,
    isAuthenticated,
    
    // Informações derivadas
    userId: user?.id,
    userName: user?.nome,
    userEmail: user?.email,
    userRole: user?.role,
    barbeariaId: user?.barbeariaId,
    
    // Verificações de permissão
    hasRole,
    hasAnyRole,
    isAdmin,
    belongsToBarbershop,
    canAccessBarbershop,
    
    // Verificações específicas por role
    isAdminSaas: () => hasRole('admin_saas'),
    isAdminBarbearia: () => hasRole('admin_barbearia'),
    isBarbeiro: () => hasRole('barbeiro'),
    isCliente: () => hasRole('cliente')
  }
}