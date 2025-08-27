// Utilitário para sincronizar autenticação com cookies
import { AuthUser } from '@/shared/types'

// Sincroniza dados de autenticação com cookies para o middleware
export function syncAuthWithCookies(user: AuthUser | null, token: string | null) {
  if (typeof window === 'undefined') return

  if (user && token) {
    // Define cookies para o middleware com configurações mais específicas
    const maxAge = 7 * 24 * 60 * 60 // 7 dias em segundos
    const cookieOptions = `path=/; max-age=${maxAge}; SameSite=Lax; Secure=${window.location.protocol === 'https:'}`
    
    document.cookie = `styllo_auth_token=${token}; ${cookieOptions}`
    document.cookie = `styllo_auth_user=${encodeURIComponent(JSON.stringify(user))}; ${cookieOptions}`
    
    // Força a atualização do estado dos cookies
    setTimeout(() => {
      // Verifica se os cookies foram definidos corretamente
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        acc[key] = value
        return acc
      }, {} as Record<string, string>)
      
      if (!cookies.styllo_auth_token || !cookies.styllo_auth_user) {
        console.warn('Cookies de autenticação não foram definidos corretamente')
      }
    }, 50)
  } else {
    // Remove cookies com todas as variações possíveis
    const expireDate = 'Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = `styllo_auth_token=; path=/; expires=${expireDate}`
    document.cookie = `styllo_auth_user=; path=/; expires=${expireDate}`
    // Também remove com domínio específico se necessário
    document.cookie = `styllo_auth_token=; path=/; expires=${expireDate}; domain=${window.location.hostname}`
    document.cookie = `styllo_auth_user=; path=/; expires=${expireDate}; domain=${window.location.hostname}`
  }
}

// Recupera dados de autenticação dos cookies
export function getAuthFromCookies(): { user: AuthUser | null; token: string | null } {
  if (typeof window === 'undefined') {
    return { user: null, token: null }
  }

  try {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      acc[key] = value
      return acc
    }, {} as Record<string, string>)

    const token = cookies.styllo_auth_token || null
    const userStr = cookies.styllo_auth_user
    
    let user = null
    if (userStr) {
      user = JSON.parse(decodeURIComponent(userStr))
    }

    return { user, token }
  } catch {
    return { user: null, token: null }
  }
}