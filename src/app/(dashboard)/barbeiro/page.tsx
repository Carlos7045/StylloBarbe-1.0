'use client'

// Dashboard do Barbeiro
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'

export default function BarbeiroPage() {
  return (
    <ProtectedRoute allowedRoles={['barbeiro']}>
      <BarbeiroDashboard />
    </ProtectedRoute>
  )
}

function BarbeiroDashboard() {
  const { user, logout } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Minha Agenda
              </h1>
              <p className="text-gray-600">
                Bem-vindo, {user?.nome}!
              </p>
              <p className="text-sm text-gray-500">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Agendamentos Hoje</h3>
              <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Próximo Cliente</h3>
              <p className="text-lg font-bold text-green-600">14:30</p>
              <p className="text-sm text-green-700">João Silva</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Receita do Dia</h3>
              <p className="text-2xl font-bold text-purple-600">R$ 320</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Agenda de Hoje</h2>
            <div className="space-y-3">
              {[
                { hora: '09:00', cliente: 'Carlos Santos', servico: 'Corte + Barba', status: 'concluido' },
                { hora: '10:30', cliente: 'Pedro Lima', servico: 'Corte', status: 'concluido' },
                { hora: '14:30', cliente: 'João Silva', servico: 'Corte + Barba', status: 'agendado' },
                { hora: '16:00', cliente: 'Miguel Costa', servico: 'Barba', status: 'agendado' },
              ].map((agendamento, index) => (
                <div key={index} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{agendamento.hora} - {agendamento.cliente}</p>
                    <p className="text-sm text-gray-600">{agendamento.servico}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    agendamento.status === 'concluido' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {agendamento.status === 'concluido' ? 'Concluído' : 'Agendado'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}