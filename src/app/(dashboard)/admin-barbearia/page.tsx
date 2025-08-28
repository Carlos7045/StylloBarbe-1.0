'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { DashboardLayout } from '@/shared/components/layout'
import { BarbershopMetrics } from '@/domains/barbershops/components/admin-dashboard/BarbershopMetrics'
import { TodayAppointments } from '@/domains/barbershops/components/admin-dashboard/TodayAppointments'
import { BarbersOverview } from '@/domains/barbershops/components/admin-dashboard/BarbersOverview'
import { AppointmentCalendar } from '@/domains/appointments/components/calendar/AppointmentCalendar'
import { PerformanceChart } from '@/shared/components/charts/PerformanceChart'
import { 
  BarberOccupancyWidget,
  RevenueMetricsWidget,
  PendingAlertsWidget
} from '@/domains/appointments/components/stats'
import { useRealTimeStats } from '@/domains/appointments/hooks/useRealTimeStats'
import { 
  useAdminBarbeariaMetrics,
  useAdminBarbeariaAgendamentos,
  useAdminBarbeariaBarbeiros,
  useAdminBarbeariaAlertas,
  useAdminBarbeariaPerformance
} from '@/domains/barbershops/hooks/useAdminBarbearia'
import { BarChart3, Calendar, Users, Settings, Bell, AlertTriangle, UserCog, Package, Clock } from 'lucide-react'

export default function AdminBarbeariaPage() {
  return (
    <ProtectedRoute allowedRoles={['admin_barbearia']}>
      <AdminBarbeariaDashboard />
    </ProtectedRoute>
  )
}

function AdminBarbeariaDashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<'overview' | 'agendamentos' | 'barbeiros' | 'funcionarios' | 'servicos' | 'horarios' | 'performance'>('overview')
  
  const barbeariaId = user?.barbeariaId || 'mock-barbearia-id'
  
  const { metricas, loading: loadingMetricas } = useAdminBarbeariaMetrics(barbeariaId)
  const { agendamentos, loading: loadingAgendamentos, updateStatus } = useAdminBarbeariaAgendamentos(barbeariaId)
  const { barbeiros, loading: loadingBarbeiros } = useAdminBarbeariaBarbeiros(barbeariaId)
  const { alertas, loading: loadingAlertas } = useAdminBarbeariaAlertas(barbeariaId)
  const { performance, loading: loadingPerformance } = useAdminBarbeariaPerformance(barbeariaId)
  
  // Estatísticas em tempo real
  const {
    barberOccupancy,
    todayRevenue,
    weekRevenue,
    monthRevenue,
    dailyRevenue,
    weeklyRevenue,
    pendingAlerts,
    totalAppointmentsToday,
    completedAppointmentsToday,
    canceledAppointmentsToday,
    isLoading: loadingStats
  } = useRealTimeStats(barbeariaId)

  const handleViewAgendamentoDetails = (id: string) => {
    console.log('Ver detalhes do agendamento:', id)
    // Implementar modal ou navegação para detalhes
  }

  const sidebarItems = [
    { id: 'overview', nome: 'Visão Geral', icone: BarChart3 },
    { id: 'agendamentos', nome: 'Agendamentos', icone: Calendar },
    { id: 'barbeiros', nome: 'Barbeiros', icone: Users },
    { id: 'funcionarios', nome: 'Funcionários', icone: UserCog, href: '/admin-barbearia/funcionarios' },
    { id: 'servicos', nome: 'Serviços', icone: Package, href: '/admin-barbearia/servicos' },
    { id: 'horarios', nome: 'Horários', icone: Clock, href: '/admin-barbearia/horarios' },
    { id: 'performance', nome: 'Performance', icone: Settings }
  ]

  const alertasAlta = pendingAlerts.filter(a => a.priority === 'high').length

  const headerActions = (
    <>
      {alertasAlta > 0 && (
        <div className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg border border-red-500">
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
        <div className="space-y-6">
          {/* Métricas originais */}
          {loadingMetricas ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-theme-secondary p-4 rounded-lg border border-theme-primary animate-pulse">
                  <div className="h-3 bg-theme-tertiary rounded mb-3"></div>
                  <div className="h-6 bg-theme-tertiary rounded mb-2"></div>
                  <div className="h-2 bg-theme-tertiary rounded"></div>
                </div>
              ))}
            </div>
          ) : metricas ? (
            <BarbershopMetrics metricas={metricas} />
          ) : null}

          {/* Estatísticas em Tempo Real - Nova seção */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Estatísticas em Tempo Real</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Atualização automática</span>
              </div>
            </div>

            {/* Grid com ocupação e alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarberOccupancyWidget
                occupancyData={barberOccupancy}
                isLoading={loadingStats}
              />
              <PendingAlertsWidget
                alerts={pendingAlerts}
                isLoading={loadingStats}
                onDismissAlert={(alertId) => console.log('Dispensar alerta:', alertId)}
                onViewAppointment={(agendamentoId) => console.log('Ver agendamento:', agendamentoId)}
              />
            </div>

            {/* Métricas de receita */}
            <RevenueMetricsWidget
              todayRevenue={todayRevenue}
              weekRevenue={weekRevenue}
              monthRevenue={monthRevenue}
              dailyRevenue={dailyRevenue}
              weeklyRevenue={weeklyRevenue}
              isLoading={loadingStats}
            />
          </div>

          {/* Alertas Importantes originais */}
          {!loadingAlertas && alertas.length > 0 && (
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-4 border-b border-theme-primary">
                <h2 className="text-lg font-semibold text-theme-primary flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Alertas Importantes
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {alertas.slice(0, 3).map((alerta) => (
                    <div key={alerta.id} className={`p-3 rounded-lg border-l-4 ${
                      alerta.prioridade === 'alta' ? 'bg-red-50 dark:bg-red-900/20 border-red-400' :
                      alerta.prioridade === 'media' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400' :
                      'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
                    }`}>
                      <h3 className="font-medium text-theme-primary text-sm">{alerta.titulo}</h3>
                      <p className="text-xs text-theme-secondary mt-1">{alerta.descricao}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Próximos Agendamentos e Performance originais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-4 border-b border-theme-primary">
                <h2 className="text-lg font-semibold text-theme-primary">
                  Próximos Agendamentos
                </h2>
              </div>
              <div className="p-4">
                {loadingAgendamentos ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-theme-tertiary rounded animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {agendamentos.slice(0, 3).map((agendamento) => (
                      <div key={agendamento.id} className="flex items-center justify-between p-2 bg-theme-tertiary rounded-lg">
                        <div>
                          <p className="font-medium text-theme-primary text-sm">{agendamento.clienteNome}</p>
                          <p className="text-xs text-theme-secondary">
                            {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })} - {agendamento.servicoNome}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600 dark:text-green-400 text-sm">
                            R$ {agendamento.valorTotal.toLocaleString()}
                          </p>
                          <p className="text-xs text-theme-muted">{agendamento.barbeiroNome}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Performance Semanal original */}
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-4 border-b border-theme-primary">
                <h2 className="text-lg font-semibold text-theme-primary">
                  Performance da Semana
                </h2>
              </div>
              <div className="p-4">
                {loadingPerformance ? (
                  <div className="h-48 bg-theme-tertiary rounded animate-pulse"></div>
                ) : (
                  <div className="h-48">
                    <PerformanceChart data={performance.map(p => ({
                      dia: p.periodo,
                      agendamentos: p.agendamentos,
                      receita: p.receita
                    }))} />
                  </div>
                )}
              </div>
            </div>
          </div>


        </div>
      )}

      {activeTab === 'agendamentos' && (
        <div>
          <AppointmentCalendar barbeariaId={barbeariaId} />
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
        <div className="space-y-6">
          <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
            <div className="p-4 border-b border-theme-primary">
              <h2 className="text-lg font-semibold text-theme-primary">
                Análise de Performance Semanal
              </h2>
            </div>
            <div className="p-4">
              {loadingPerformance ? (
                <div className="h-64 bg-theme-tertiary rounded animate-pulse"></div>
              ) : (
                <PerformanceChart data={performance.map(p => ({
                  dia: p.periodo,
                  agendamentos: p.agendamentos,
                  receita: p.receita
                }))} />
              )}
            </div>
          </div>

          {/* Resumo de Performance */}
          {metricas && (
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-4 border-b border-theme-primary">
                <h2 className="text-lg font-semibold text-theme-primary">
                  Resumo do Mês
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-theme-tertiary rounded-lg">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      R$ {metricas.receitaMes.toLocaleString()}
                    </p>
                    <p className="text-sm text-theme-secondary">Receita Total</p>
                  </div>
                  <div className="text-center p-3 bg-theme-tertiary rounded-lg">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {metricas.taxaOcupacao}%
                    </p>
                    <p className="text-sm text-theme-secondary">Taxa de Ocupação</p>
                  </div>
                  <div className="text-center p-3 bg-theme-tertiary rounded-lg">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {metricas.avaliacaoMedia.toFixed(1)} ⭐
                    </p>
                    <p className="text-sm text-theme-secondary">Avaliação Média</p>
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