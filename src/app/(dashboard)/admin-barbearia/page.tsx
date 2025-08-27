'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { DashboardLayout } from '@/shared/components/layout'
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
  const { user } = useUser()
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

  const sidebarItems = [
    { id: 'overview', nome: 'Visão Geral', icone: BarChart3 },
    { id: 'agendamentos', nome: 'Agendamentos', icone: Calendar },
    { id: 'barbeiros', nome: 'Barbeiros', icone: Users },
    { id: 'performance', nome: 'Performance', icone: Settings }
  ]

  const alertasAlta = alertas.filter(a => a.prioridade === 'alta').length

  const headerActions = (
    <>
      {alertasAlta > 0 && (
        <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">{alertasAlta} alertas importantes</span>
        </div>
      )}
    </>
  )

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeSidebarItem={activeTab}
      onSidebarItemClick={(itemId) => setActiveTab(itemId as any)}
      title="Dashboard da Barbearia"
      subtitle={`Bem-vindo, ${user?.nome}! Gerencie sua barbearia de forma eficiente.`}
      headerActions={headerActions}
    >
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Métricas */}
          {loadingMetricas ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-theme-secondary p-6 rounded-lg border border-theme-primary animate-pulse">
                  <div className="h-4 bg-theme-tertiary rounded mb-4"></div>
                  <div className="h-8 bg-theme-tertiary rounded mb-2"></div>
                  <div className="h-3 bg-theme-tertiary rounded"></div>
                </div>
              ))}
            </div>
          ) : metricas ? (
            <BarbershopMetrics metricas={metricas} />
          ) : null}

          {/* Alertas Importantes */}
          {!loadingAlertas && alertas.length > 0 && (
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-6 border-b border-theme-primary">
                <h2 className="text-xl font-semibold text-theme-primary flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Alertas Importantes
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {alertas.slice(0, 3).map((alerta) => (
                    <div key={alerta.id} className={`p-4 rounded-lg border-l-4 ${
                      alerta.prioridade === 'alta' ? 'bg-red-50 dark:bg-red-900/20 border-red-400' :
                      alerta.prioridade === 'media' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400' :
                      'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
                    }`}>
                      <h3 className="font-medium text-theme-primary">{alerta.titulo}</h3>
                      <p className="text-sm text-theme-secondary mt-1">{alerta.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Próximos Agendamentos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-6 border-b border-theme-primary">
                <h2 className="text-xl font-semibold text-theme-primary">
                  Próximos Agendamentos
                </h2>
              </div>
              <div className="p-6">
                {loadingAgendamentos ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-theme-tertiary rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {agendamentos.slice(0, 3).map((agendamento) => (
                      <div key={agendamento.id} className="flex items-center justify-between p-3 bg-theme-tertiary rounded-lg">
                        <div>
                          <p className="font-medium text-theme-primary">{agendamento.clienteNome}</p>
                          <p className="text-sm text-theme-secondary">
                            {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })} - {agendamento.servicoNome}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600 dark:text-green-400">
                            R$ {agendamento.valorTotal.toLocaleString()}
                          </p>
                          <p className="text-sm text-theme-muted">{agendamento.barbeiroNome}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Performance Semanal */}
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-6 border-b border-theme-primary">
                <h2 className="text-xl font-semibold text-theme-primary">
                  Performance da Semana
                </h2>
              </div>
              <div className="p-6">
                {loadingPerformance ? (
                  <div className="h-64 bg-theme-tertiary rounded animate-pulse"></div>
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
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary p-6 animate-pulse">
              <div className="h-6 bg-theme-tertiary rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-theme-tertiary rounded"></div>
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
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary p-6 animate-pulse">
              <div className="h-6 bg-theme-tertiary rounded mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-theme-tertiary rounded"></div>
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
          <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
            <div className="p-6 border-b border-theme-primary">
              <h2 className="text-xl font-semibold text-theme-primary">
                Análise de Performance Semanal
              </h2>
            </div>
            <div className="p-6">
              {loadingPerformance ? (
                <div className="h-80 bg-theme-tertiary rounded animate-pulse"></div>
              ) : (
                <PerformanceChart data={performance} />
              )}
            </div>
          </div>

          {/* Resumo de Performance */}
          {metricas && (
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-6 border-b border-theme-primary">
                <h2 className="text-xl font-semibold text-theme-primary">
                  Resumo do Mês
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      R$ {metricas.receitaMes.toLocaleString()}
                    </p>
                    <p className="text-theme-secondary">Receita Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {metricas.taxaOcupacao}%
                    </p>
                    <p className="text-theme-secondary">Taxa de Ocupação</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {metricas.avaliacaoMedia.toFixed(1)} ⭐
                    </p>
                    <p className="text-theme-secondary">Avaliação Média</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  )
}