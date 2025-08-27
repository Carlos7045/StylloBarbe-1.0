'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'
import { BarbershopMetrics } from '@/domains/barbershops/components/admin-dashboard/BarbershopMetrics'
import { TodayAppointments } from '@/domains/barbershops/components/admin-dashboard/TodayAppointments'
import { BarbersOverview } from '@/domains/barbershops/components/admin-dashboard/BarbersOverview'
import { PerformanceChart } from '@/shared/components/charts/PerformanceChart'
import { 
  useAdminBarbeariaMetrics,
  useAdminBarbeariaAgendamentos,
  useAdminBarbeariaBarbeiros,
  useAdminBarbeariaAlertas,
  useAdminBarbeariaPerformance
} from '@/domains/barbershops/hooks/useAdminBarbearia'
import { BarChart3, Calendar, Users, Settings, Bell, AlertTriangle } from 'lucide-react'

export default function AdminBarbeariaPage() {
  return (
    <ProtectedRoute allowedRoles={['admin_barbearia']}>
      <AdminBarbeariaDashboard />
    </ProtectedRoute>
  )
}

function AdminBarbeariaDashboard() {
  const { user, logout } = useUser()
  const [activeTab, setActiveTab] = useState<'overview' | 'agendamentos' | 'barbeiros' | 'performance'>('overview')
  
  const barbeariaId = user?.barbeariaId || 'mock-barbearia-id'
  
  const { metricas, loading: loadingMetricas } = useAdminBarbeariaMetrics(barbeariaId)
  const { agendamentos, loading: loadingAgendamentos, updateStatus } = useAdminBarbeariaAgendamentos(barbeariaId)
  const { barbeiros, loading: loadingBarbeiros } = useAdminBarbeariaBarbeiros(barbeariaId)
  const { alertas, loading: loadingAlertas } = useAdminBarbeariaAlertas(barbeariaId)
  const { performance, loading: loadingPerformance } = useAdminBarbeariaPerformance(barbeariaId)

  const handleViewAgendamentoDetails = (id: string) => {
    console.log('Ver detalhes do agendamento:', id)
    // Implementar modal ou navegação para detalhes
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'agendamentos', label: 'Agendamentos', icon: Calendar },
    { id: 'barbeiros', label: 'Barbeiros', icon: Users },
    { id: 'performance', label: 'Performance', icon: Settings }
  ]

  const alertasAlta = alertas.filter(a => a.prioridade === 'alta').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard da Barbearia
              </h1>
              <p className="text-gray-600 mt-1">
                Bem-vindo, {user?.nome}! Gerencie sua barbearia de forma eficiente.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {alertasAlta > 0 && (
                <div className="flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg border border-red-200">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">{alertasAlta} alertas importantes</span>
                </div>
              )}
              
              <Button 
                variant="outline" 
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex space-x-8 border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Métricas */}
            {loadingMetricas ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg border animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : metricas ? (
              <BarbershopMetrics metricas={metricas} />
            ) : null}

            {/* Alertas Importantes */}
            {!loadingAlertas && alertas.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Alertas Importantes
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {alertas.slice(0, 3).map((alerta) => (
                      <div key={alerta.id} className={`p-4 rounded-lg border-l-4 ${
                        alerta.prioridade === 'alta' ? 'bg-red-50 border-red-400' :
                        alerta.prioridade === 'media' ? 'bg-yellow-50 border-yellow-400' :
                        'bg-blue-50 border-blue-400'
                      }`}>
                        <h3 className="font-medium text-gray-900">{alerta.titulo}</h3>
                        <p className="text-sm text-gray-600 mt-1">{alerta.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Próximos Agendamentos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Próximos Agendamentos
                  </h2>
                </div>
                <div className="p-6">
                  {loadingAgendamentos ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {agendamentos.slice(0, 3).map((agendamento) => (
                        <div key={agendamento.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{agendamento.clienteNome}</p>
                            <p className="text-sm text-gray-600">
                              {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })} - {agendamento.servicoNome}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">
                              R$ {agendamento.valorTotal.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">{agendamento.barbeiroNome}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Performance Semanal */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Performance da Semana
                  </h2>
                </div>
                <div className="p-6">
                  {loadingPerformance ? (
                    <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
                  ) : (
                    <div className="h-64">
                      <PerformanceChart data={performance} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agendamentos' && (
          <div>
            {loadingAgendamentos ? (
              <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <TodayAppointments 
                agendamentos={agendamentos}
                onUpdateStatus={updateStatus}
                onViewDetails={handleViewAgendamentoDetails}
              />
            )}
          </div>
        )}

        {activeTab === 'barbeiros' && (
          <div>
            {loadingBarbeiros ? (
              <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-48 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <BarbersOverview barbeiros={barbeiros} />
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  Análise de Performance Semanal
                </h2>
              </div>
              <div className="p-6">
                {loadingPerformance ? (
                  <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
                ) : (
                  <PerformanceChart data={performance} />
                )}
              </div>
            </div>

            {/* Resumo de Performance */}
            {metricas && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Resumo do Mês
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">
                        R$ {metricas.receitaMes.toLocaleString()}
                      </p>
                      <p className="text-gray-600">Receita Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-blue-600">
                        {metricas.taxaOcupacao}%
                      </p>
                      <p className="text-gray-600">Taxa de Ocupação</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-600">
                        {metricas.avaliacaoMedia.toFixed(1)} ⭐
                      </p>
                      <p className="text-gray-600">Avaliação Média</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}