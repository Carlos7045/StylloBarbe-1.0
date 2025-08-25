// Utilitário para sincronizar autenticação com cookies
import { AuthUser } from '@/shared/types'

// Sincroniza dados de autenticação com cookies para o middleware
export function syncAuthWithCookies(user: AuthUser | null, token: string | null) {
  if (typeof window === 'undefined') return

  if (user && token) {
    // Define cookies para o middleware
    document.cookie = `styllo_auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 dias
    document.cookie = `styllo_auth_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${7 * 24 * 60 * 60}`
  } else {
    // Remove cookies
    document.cookie = 'styllo_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'styllo_auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
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