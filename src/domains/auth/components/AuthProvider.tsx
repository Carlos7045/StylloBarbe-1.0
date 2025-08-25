'use client'

// Provider de autenticação com contexto
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { AuthContextType, AuthState, LoginCredentials, RegisterData } from '../types'
import { authService } from '../services/authService'
import { AuthUser } from '@/shared/types'
import { syncAuthWithCookies } from '../utils/cookieSync'

// Estado inicial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

// Actions do reducer
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: AuthUser }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGOUT' }

// Reducer para gerenciar estado de autenticação
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_USER':
      // Sincroniza com cookies quando define usuário
      const token = authService.getToken()
      syncAuthWithCookies(action.payload, token)
      
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    
    case 'LOGOUT':
      // Remove cookies quando faz logout
      syncAuthWithCookies(null, null)
      
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      }
    
    default:
      return state
  }
}

// Contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props do provider
interface AuthProviderProps {
  children: React.ReactNode
}

// Provider de autenticação
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Verifica autenticação ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = authService.getCurrentUser()
        
        if (user && authService.isAuthenticated()) {
          dispatch({ type: 'SET_USER', payload: user })
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    checkAuth()
  }, [])

  // Função de login
  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })
      
      const user = await authService.login(credentials)
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao fazer login'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw error
    }
  }

  // Função de registro
  const register = async (data: RegisterData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })
      
      const user = await authService.register(data)
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar conta'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw error
    }
  }

  // Função de logout
  const logout = () => {
    authService.logout()
    dispatch({ type: 'LOGOUT' })
  }

  // Limpar erro
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  // Valor do contexto
  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar o contexto de autenticação
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider')
  }
  
  return context
}