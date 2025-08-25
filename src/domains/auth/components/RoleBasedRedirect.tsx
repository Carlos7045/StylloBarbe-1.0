'use client'

// Componente para redirecionamento baseado em role
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../hooks/useUser'
import { ROLE_REDIRECTS } from '../types'

interface RoleBasedRedirectProps {
  children?: React.ReactNode
  fallbackPath?: string
}

export function RoleBasedRedirect({ 
  children, 
  fallbackPath = '/' 
}: RoleBasedRedirectProps) {
  const { user, isAuthenticated } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redireciona para o dashboard apropriado baseado na role
      const redirectPath = ROLE_REDIRECTS[user.role]
      
      if (redirectPath) {
        router.push(redirectPath)
      } else {
        // Se não há redirecionamento definido, vai para fallback
        router.push(fallbackPath)
      }
    }
  }, [isAuthenticated, user, router, fallbackPath])

  // Renderiza children se fornecido (útil para loading states)
  return children ? <>{children}</> : null
}

// Hook para redirecionamento programático baseado em role
export function useRoleBasedRedirect() {
  const { user, isAuthenticated } = useUser()
  const router = useRouter()

  const redirectToUserDashboard = () => {
    if (isAuthenticated && user) {
      const redirectPath = ROLE_REDIRECTS[user.role]
      if (redirectPath) {
        router.push(redirectPath)
      }
    }
  }

  const redirectToRole = (targetRole: keyof typeof ROLE_REDIRECTS) => {
    const redirectPath = ROLE_REDIRECTS[targetRole]
    if (redirectPath) {
      router.push(redirectPath)
    }
  }

  return {
    redirectToUserDashboard,
    redirectToRole,
    currentUserRedirectPath: user ? ROLE_REDIRECTS[user.role] : null
  }
}