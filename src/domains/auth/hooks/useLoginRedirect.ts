// Hook para gerenciar redirecionamentos após login
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { AuthUser } from '@/shared/types'
import { syncAuthWithCookies } from '../utils/cookieSync'

export function useLoginRedirect() {
  const router = useRouter()

  const redirectAfterLogin = useCallback(async (user: AuthUser, token: string) => {
    // Sincronizar com cookies imediatamente
    syncAuthWithCookies(user, token)
    
    // Aguardar para garantir que os cookies foram definidos
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Determinar rota de redirecionamento
    const redirectPath = (() => {
      switch (user.role) {
        case 'admin_saas':
          return '/admin-saas'
        case 'admin_barbearia':
          return '/admin-barbearia'
        case 'barbeiro':
          return '/barbeiro'
        case 'cliente':
          return '/cliente'
        default:
          return '/'
      }
    })()
    
    // Usar window.location para forçar navegação completa
    // Isso garante que o middleware seja executado com os novos cookies
    window.location.href = redirectPath
  }, [router])

  return { redirectAfterLogin }
}