'use client'

// Dashboard do Cliente
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'

export default function ClientePage() {
  return (
    <ProtectedRoute allowedRoles={['cliente']}>
      <ClienteDashboard />
    </ProtectedRoute>
  )
}

function ClienteDashboard() {
  const { user, logout } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Meus Agendamentos
              </h1>
              <p className="text-gray-600">
                Bem-vindo, {user?.nome}!
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="primary">
                Novo Agendamento
              </Button>
              <Button 
                variant="outline" 
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Próximo Agendamento</h3>
              <p className="text-lg font-bold text-blue-600">Amanhã 15:00</p>
              <p className="text-sm text-blue-700">Barbearia Central</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Total de Cortes</h3>
              <p className="text-2xl font-bold text-green-600">24</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Barbeiro Favorito</h3>
              <p className="text-lg font-bold text-purple-600">João</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Histórico de Agendamentos</h2>
            <div className="space-y-3">
              {[
                { 
                  data: '15/01/2025', 
                  hora: '15:00', 
                  barbearia: 'Barbearia Central', 
                  barbeiro: 'João Silva',
                  servico: 'Corte + Barba', 
                  valor: 'R$ 45,00',
                  status: 'agendado' 
                },
                { 
                  data: '08/01/2025', 
                  hora: '14:30', 
                  barbearia: 'Barbearia Central', 
                  barbeiro: 'João Silva',
                  servico: 'Corte', 
                  valor: 'R$ 30,00',
                  status: 'concluido' 
                },
                { 
                  data: '22/12/2024', 
                  hora: '16:00', 
                  barbearia: 'Barbearia Central', 
                  barbeiro: 'Pedro Costa',
                  servico: 'Corte + Barba', 
                  valor: 'R$ 45,00',
                  status: 'concluido' 
                },
              ].map((agendamento, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{agendamento.data} às {agendamento.hora}</p>
                      <p className="text-sm text-gray-600">{agendamento.barbearia} - {agendamento.barbeiro}</p>
                      <p className="text-sm text-gray-600">{agendamento.servico}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{agendamento.valor}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        agendamento.status === 'concluido' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {agendamento.status === 'concluido' ? 'Concluído' : 'Agendado'}
                      </span>
                    </div>
                  </div>
                  
                  {agendamento.status === 'agendado' && (
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">
                        Reagendar
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}