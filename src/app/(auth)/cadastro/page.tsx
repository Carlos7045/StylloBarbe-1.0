'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
    tipo: 'cliente'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const formatCPF = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '')
    
    // Aplica a máscara
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const formatPhone = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '')
    
    // Aplica a máscara
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    let formattedValue = value
    
    if (name === 'cpf') {
      formattedValue = formatCPF(value)
    } else if (name === 'telefone') {
      formattedValue = formatPhone(value)
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      // Importar dinamicamente para evitar problemas de SSR
      const { authService } = await import('@/domains/auth/services/authService')
      
      // Fazer cadastro real
      await authService.register({
        email: formData.email,
        senha: formData.senha,
        confirmarSenha: formData.confirmarSenha,
        nome: formData.nome,
        telefone: formData.telefone,
        cpf: formData.cpf,
        role: formData.tipo.replace('-', '_') as any // Converte 'admin-barbearia' para 'admin_barbearia'
      })
      
      // Redirecionar para login após cadastro
      router.push('/login?message=Cadastro realizado com sucesso! Faça login para continuar.')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar conta. Tente novamente.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    color: '#1a1a1a',
    background: 'white',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box' as const
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '0.5rem'
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
        {/* Cadastro Card */}
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
              Criar conta
            </h1>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem'
            }}>
              Junte-se ao StylloBarber
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Nome Field */}
            <div>
              <label htmlFor="nome" style={labelStyle}>
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
                style={inputStyle}
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

            {/* Email Field */}
            <div>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seu@email.com"
                style={inputStyle}
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

            {/* Telefone Field */}
            <div>
              <label htmlFor="telefone" style={labelStyle}>
                Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                value={formData.telefone}
                onChange={handleChange}
                required
                placeholder="(11) 99999-9999"
                style={inputStyle}
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

            {/* CPF Field */}
            <div>
              <label htmlFor="cpf" style={labelStyle}>
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                style={inputStyle}
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

            {/* Tipo de usuário */}
            <div>
              <label htmlFor="tipo" style={labelStyle}>
                Tipo de conta
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#d4af37'
                  e.target.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <option value="cliente">Cliente</option>
                <option value="barbeiro">Barbeiro</option>
                <option value="admin-barbearia">Admin Barbearia</option>
              </select>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="senha" style={labelStyle}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  placeholder="Mínimo 6 caracteres"
                  style={{
                    ...inputStyle,
                    paddingRight: '3rem'
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmarSenha" style={labelStyle}>
                Confirmar senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  required
                  placeholder="Confirme sua senha"
                  style={{
                    ...inputStyle,
                    paddingRight: '3rem'
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? '🙈' : '👁️'}
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
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                marginTop: '1rem'
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.opacity = '0.9'
                  e.target.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.opacity = '1'
                  e.target.style.transform = 'translateY(0)'
                }
              }}
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          {/* Footer Links */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link 
              href="/login" 
              style={{
                fontSize: '0.875rem',
                color: '#d4af37',
                textDecoration: 'none'
              }}
            >
              Já tem uma conta? Faça login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
