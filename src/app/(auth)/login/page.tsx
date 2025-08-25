'use client'

// Página de login com exemplo de uso do sistema de autenticação
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { login, isLoading, error } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const redirectTo = searchParams.get('redirect') || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await login({ email, senha })
      
      // Após login bem-sucedido, o redirecionamento será feito automaticamente
      // pelo RoleBasedRedirect ou pelo middleware
      if (redirectTo !== '/') {
        router.push(redirectTo)
      }
    } catch (error) {
      // Erro já é tratado pelo hook useAuth
      console.error('Erro no login:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Faça login na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Sistema de Gestão StylloBarber
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
            />
            
            <Input
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Sua senha"
            />
          </div>

          {error && (
            <div className="bg-error-light border border-error text-error px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            className="w-full"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6">
          <div className="text-sm text-muted">
            <p className="mb-2 font-medium text-primary">Usuários de teste:</p>
            <ul className="space-y-1 text-xs">
              <li>• Admin SaaS: admin@styllo.com / 123456</li>
              <li>• Admin Barbearia: barbearia@styllo.com / 123456</li>
              <li>• Barbeiro: barbeiro@styllo.com / 123456</li>
              <li>• Cliente: cliente@styllo.com / 123456</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}