'use client'

// Dashboard do Admin Barbearia
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'

export default function AdminBarbeariaPage() {
  return (
    <ProtectedRoute allowedRoles={['admin_barbearia']}>
      <AdminBarbeariaDashboard />
    </ProtectedRoute>
  )
}

function AdminBarbeariaDashboard() {
  const { user, logout } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Dashboard Admin Barbearia
              </h1>
              <p className="text-muted">
                Bem-vindo, {user?.nome}!
              </p>
              <p className="text-sm text-subtle">
                Barbearia ID: {user?.barbeariaId}
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={logout}
            >
              Sair
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Agendamentos Hoje</h3>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Receita do Dia</h3>
              <p className="text-2xl font-bold text-green-600">R$ 480</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-900">Barbeiros Ativos</h3>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Taxa Ocupação</h3>
              <p className="text-2xl font-bold text-purple-600">85%</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 text-primary">Gestão da Barbearia</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-primary">Funcionários</h3>
                <p className="text-sm text-muted">Gerenciar barbeiros e recepcionistas</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-primary">Serviços</h3>
                <p className="text-sm text-muted">Configurar preços e durações</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-primary">Horários</h3>
                <p className="text-sm text-muted">Definir funcionamento e pausas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}