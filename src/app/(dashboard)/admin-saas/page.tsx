'use client'

// Dashboard do Admin SaaS
import { useUser } from '@/domains/auth'
import { AdminSaasOnlyRoute } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'

export default function AdminSaasPage() {
  return (
    <AdminSaasOnlyRoute>
      <AdminSaasDashboard />
    </AdminSaasOnlyRoute>
  )
}

function AdminSaasDashboard() {
  const { user, logout } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Dashboard Admin SaaS
              </h1>
              <p className="text-muted">
                Bem-vindo, {user?.nome}!
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={logout}
            >
              Sair
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Barbearias Ativas</h3>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Receita Mensal</h3>
              <p className="text-2xl font-bold text-green-600">R$ 12.450</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Novos Cadastros</h3>
              <p className="text-2xl font-bold text-purple-600">8</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-primary">Funcionalidades Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-primary">Gestão de Barbearias</h3>
                <p className="text-sm text-muted">Ativar, desativar e gerenciar contas</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-primary">Relatórios Financeiros</h3>
                <p className="text-sm text-muted">Acompanhar receita e métricas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}