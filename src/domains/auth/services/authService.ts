// Serviço de autenticação com Supabase
import { supabase, type User } from '@/lib/supabase'
import { AuthUser } from '@/shared/types'
import { LoginCredentials, RegisterData } from '../types'

class AuthService {
  private readonly TOKEN_KEY = 'styllo_auth_token'
  private readonly USER_KEY = 'styllo_auth_user'

  // Converte User do Supabase para AuthUser do sistema
  private mapUserToAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      email: user.email,
      nome: user.name,
      role: user.role.replace('-', '_') as AuthUser['role'], // Converte 'admin-saas' para 'admin_saas'
      telefone: user.phone,
      cpf: user.cpf,
      avatarUrl: user.avatar_url
    }
  }

  // Login com Supabase
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      // Buscar usuário no banco
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', credentials.email)
        .eq('is_active', true)
        .single()

      if (error || !user) {
        throw new Error('Usuário não encontrado')
      }

      // Para desenvolvimento, aceitar senha simples "123456"
      // Em produção, usar bcrypt.compare(credentials.senha, user.password_hash)
      if (credentials.senha !== '123456') {
        throw new Error('Senha incorreta')
      }

      // Atualizar último login
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', user.id)

      // Converter para AuthUser
      const authUser = this.mapUserToAuthUser(user)

      // Salvar sessão local
      this.saveUserSession(authUser)

      return authUser
    } catch (error) {
      console.error('Erro no login:', error)
      throw new Error('Email ou senha incorretos')
    }
  }

  // Registro com Supabase
  async register(data: RegisterData): Promise<AuthUser> {
    try {
      // Validações básicas
      if (data.senha !== data.confirmarSenha) {
        throw new Error('As senhas não coincidem')
      }

      if (data.senha.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres')
      }

      // Verificar se email já existe
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', data.email)
        .single()

      if (existingUser) {
        throw new Error('Email já está em uso')
      }

      // Para desenvolvimento, usar hash simples
      // Em produção, usar bcrypt.hash(data.senha, 10)
      const passwordHash = `$2b$10$example_hash_${data.email}`

      // Inserir novo usuário
      const { data: newUser, error } = await supabase
        .from('users')
        .insert({
          email: data.email,
          password_hash: passwordHash,
          name: data.nome,
          phone: data.telefone,
          cpf: data.cpf,
          role: data.role.replace('_', '-') // Converte 'admin_saas' para 'admin-saas'
        })
        .select()
        .single()

      if (error) {
        throw new Error('Erro ao criar usuário')
      }

      // Converter para AuthUser
      const authUser = this.mapUserToAuthUser(newUser)

      return authUser
    } catch (error) {
      console.error('Erro no cadastro:', error)
      throw error
    }
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

  // Salva sessão do usuário
  saveUserSession(user: AuthUser): void {
    const token = `styllo_token_${user.id}_${Date.now()}`
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  // Busca usuário por ID
  async getUserById(id: string): Promise<User | null> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('id, email, name, phone, cpf, role, avatar_url, created_at, updated_at, last_login, is_active')
        .eq('id', id)
        .single()

      if (error || !user) {
        return null
      }

      return user
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      return null
    }
  }
}

export const authService = new AuthService()