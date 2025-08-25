// Middleware de autenticação para Next.js
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas públicas que não precisam de autenticação
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/cadastro',
  '/agendamento',
  '/recuperar-senha'
]

// Rotas protegidas e suas roles permitidas
const PROTECTED_ROUTES: Record<string, string[]> = {
  '/admin-saas': ['admin_saas'],
  '/admin-barbearia': ['admin_barbearia'],
  '/barbeiro': ['barbeiro'],
  '/cliente': ['cliente']
}

// Redirecionamentos por role
const ROLE_REDIRECTS: Record<string, string> = {
  admin_saas: '/admin-saas',
  admin_barbearia: '/admin-barbearia',
  barbeiro: '/barbeiro',
  cliente: '/cliente'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Ignora arquivos estáticos e API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Verifica se é uma rota pública
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // Recupera dados de autenticação dos cookies/headers
  const token = request.cookies.get('styllo_auth_token')?.value
  const userStr = request.cookies.get('styllo_auth_user')?.value
  
  let user = null
  try {
    if (userStr) {
      user = JSON.parse(userStr)
    }
  } catch {
    // Se não conseguir parsear o usuário, considera não autenticado
  }

  const isAuthenticated = !!(token && user)

  // Se não está autenticado e tenta acessar rota protegida
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Se está autenticado
  if (isAuthenticated && user) {
    // Se está na página de login/cadastro, redireciona para dashboard
    if (pathname === '/login' || pathname === '/cadastro') {
      const dashboardUrl = ROLE_REDIRECTS[user.role] || '/'
      return NextResponse.redirect(new URL(dashboardUrl, request.url))
    }

    // Verifica permissões para rotas protegidas
    for (const [route, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(user.role)) {
          // Usuário não tem permissão, redireciona para seu dashboard
          const dashboardUrl = ROLE_REDIRECTS[user.role] || '/'
          return NextResponse.redirect(new URL(dashboardUrl, request.url))
        }
        break
      }
    }
  }

  return NextResponse.next()
}

// Configuração do matcher para definir em quais rotas o middleware deve rodar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}