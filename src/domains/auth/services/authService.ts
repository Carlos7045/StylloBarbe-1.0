// Serviço de autenticação
import { AuthUser } from '@/shared/types'
import { LoginCredentials, RegisterData } from '../types'

// Simulação de API - será substituído pela integração com Supabase
class AuthService {
  private readonly TOKEN_KEY = 'styllo_auth_token'
  private readonly USER_KEY = 'styllo_auth_user'

  // Simula login - será substituído pela integração Supabase
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    // Simulação de delay de API
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Usuários mock para desenvolvimento
    const mockUsers: AuthUser[] = [
      {
        id: '1',
        email: 'admin@styllo.com',
        nome: 'Admin SaaS',
        role: 'admin_saas'
      },
      {
        id: '2',
        email: 'barbearia@styllo.com',
        nome: 'Admin Barbearia',
        role: 'admin_barbearia',
        barbeariaId: 'barbearia-1'
      },
      {
        id: '3',
        email: 'barbeiro@styllo.com',
        nome: 'João Barbeiro',
        role: 'barbeiro',
        barbeariaId: 'barbearia-1'
      },
      {
        id: '4',
        email: 'cliente@styllo.com',
        nome: 'Maria Cliente',
        role: 'cliente'
      }
    ]

    const user = mockUsers.find(u => u.email === credentials.email)
    
    if (!user || credentials.senha !== '123456') {
      throw new Error('Email ou senha inválidos')
    }

    // Simula token JWT
    const token = `mock_token_${user.id}_${Date.now()}`
    
    // Salva no localStorage
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))

    return user
  }

  // Simula registro - será substituído pela integração Supabase
  async register(data: RegisterData): Promise<AuthUser> {
    // Simulação de delay de API
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Validações básicas
    if (data.senha !== data.confirmarSenha) {
      throw new Error('As senhas não coincidem')
    }

    if (data.senha.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres')
    }

    // Simula criação do usuário
    const newUser: AuthUser = {
      id: `user_${Date.now()}`,
      email: data.email,
      nome: data.nome,
      role: data.role,
      barbeariaId: data.barbeariaId
    }

    // Simula token JWT
    const token = `mock_token_${newUser.id}_${Date.now()}`
    
    // Salva no localStorage
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(newUser))

    return newUser
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  // Recupera usuário do localStorage
  getCurrentUser(): AuthUser | null {
    try {
      const userStr = localStorage.getItem(this.USER_KEY)
      const token = localStorage.getItem(this.TOKEN_KEY)
      
      if (!userStr || !token) {
        return null
      }

      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  // Verifica se está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY)
    const user = this.getCurrentUser()
    
    return !!(token && user)
  }

  // Recupera token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }
}

export const authService = new AuthService()