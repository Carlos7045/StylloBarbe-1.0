'use client'

// Componente para proteção de rotas no lado do cliente
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../hooks/useUser'
import { UserRole } from '@/shared/types'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo,
  fallback
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useUser()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Aguarda a verificação de autenticação
    const timer = setTimeout(() => {
      setIsChecking(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isChecking) {
      // Se não está autenticado, redireciona para login
      if (!isAuthenticated) {
        const loginUrl = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        router.push(loginUrl)
        return
      }

      // Se tem roles específicas definidas, verifica permissão
      if (allowedRoles && user) {
        const hasPermission = allowedRoles.includes(user.role)
        
        if (!hasPermission) {
          // Se tem redirectTo definido, usa ele, senão redireciona para dashboard do usuário
          if (redirectTo) {
            router.push(redirectTo)
          } else {
            // Redireciona para o dashboard apropriado baseado na role
            const roleRedirects: Record<UserRole, string> = {
              admin_saas: '/admin-saas',
              admin_barbearia: '/admin-barbearia',
              barbeiro: '/barbeiro',
              cliente: '/cliente'
            }
            
            const userDashboard = roleRedirects[user.role]
            if (userDashboard) {
              router.push(userDashboard)
            }
          }
          return
        }
      }
    }
  }, [isChecking, isAuthenticated, user, allowedRoles, redirectTo, router])

  // Mostra loading enquanto verifica autenticação
  if (isChecking) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
      </div>
    )
  }

  // Se não está autenticado, não renderiza nada (vai redirecionar)
  if (!isAuthenticated) {
    return null
  }

  // Se tem roles definidas e usuário não tem permissão, não renderiza
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null
  }

  // Renderiza o conteúdo protegido
  return <>{children}</>
}

// Componente específico para admins
export function AdminOnlyRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin_saas', 'admin_barbearia']}>
      {children}
    </ProtectedRoute>
  )
}

// Componente específico para admin SaaS
export function AdminSaasOnlyRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin_saas']}>
      {children}
    </ProtectedRoute>
  )
}

// Componente específico para barbeiros e admins de barbearia
export function BarbershopStaffRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['admin_barbearia', 'barbeiro']}>
      {children}
    </ProtectedRoute>
  )
}