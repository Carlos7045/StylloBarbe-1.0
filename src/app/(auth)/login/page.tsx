'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLoginRedirect } from '@/domains/auth/hooks/useLoginRedirect'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { redirectAfterLogin } = useLoginRedirect()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      // Importar dinamicamente para evitar problemas de SSR
      const { authService } = await import('@/domains/auth/services/authService')
      
      // Fazer login real
      const user = await authService.login({ email, senha })
      
      // Obter token para sincronização
      const token = authService.getToken()
      
      if (token) {
        // Usar o hook de redirecionamento que garante sincronização adequada
        await redirectAfterLogin(user, token)
      } else {
        throw new Error('Token não encontrado após login')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Email ou senha incorretos'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        position: 'relative'
      }}>
        {/* Login Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              borderRadius: '1rem',
              background: '#d4af37',
              marginBottom: '1rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              ✂️
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: '0.5rem'
            }}>
              Bem-vindo de volta
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              Faça login na sua conta StylloBarber
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  color: '#1a1a1a',
                  background: 'white',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#d4af37'
                  e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="senha" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#1a1a1a',
                marginBottom: '0.5rem'
              }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="Sua senha"
                  style={{
                    width: '100%',
                    padding: '0.75rem 3rem 0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    color: '#1a1a1a',
                    background: 'white',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#d4af37'
                    e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem 2rem',
                background: isLoading ? '#9ca3af' : '#d4af37',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  const target = e.target as HTMLElement
                  target.style.opacity = '0.9'
                  target.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  const target = e.target as HTMLElement
                  target.style.opacity = '1'
                  target.style.transform = 'translateY(0)'
                }
              }}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Debug Button */}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={async () => {
                const { authService } = await import('@/domains/auth/services/authService')
                authService.clearAllAuthData()
                window.location.reload()
              }}
              style={{
                fontSize: '0.75rem',
                color: '#ef4444',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                marginBottom: '0.5rem'
              }}
            >
              🔧 Limpar dados de autenticação (Debug)
            </button>
          </div>

          {/* Footer Links */}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link 
              href="/cadastro" 
              style={{
                fontSize: '0.875rem',
                color: '#d4af37',
                textDecoration: 'none'
              }}
            >
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </div>

        {/* Test Users Info */}
        <div style={{
          marginTop: '1.5rem',
          background: 'rgba(31, 41, 55, 0.8)',
          borderRadius: '0.75rem',
          padding: '1rem',
          border: '1px solid rgba(75, 85, 99, 0.5)'
        }}>
          <p style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'white',
            marginBottom: '0.75rem'
          }}>
            Usuários de teste:
          </p>
          <div style={{
            display: 'grid',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: '#d1d5db'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Admin SaaS:</span>
              <span>admin@styllo.com / 123456</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Admin Barbearia:</span>
              <span>barbearia@styllo.com / 123456</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Barbeiro:</span>
              <span>barbeiro@styllo.com / 123456</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Cliente:</span>
              <span>cliente@styllo.com / 123456</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}