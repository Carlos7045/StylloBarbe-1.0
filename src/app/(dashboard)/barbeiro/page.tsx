'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { DashboardLayout } from '@/shared/components/layout'
import { BarberMetrics } from '@/domains/users/components/barbeiro/BarberMetrics'
import { PersonalSchedule } from '@/domains/users/components/barbeiro/PersonalSchedule'
import { ClientHistory } from '@/domains/users/components/barbeiro/ClientHistory'
import { PerformanceChart } from '@/shared/components/charts/PerformanceChart'
import { 
  useBarbeiroMetrics,
  useBarbeiroAgendamentos,
  useBarbeiroClientes,
  useBarbeiroNotificacoes,
  useBarbeiroPerformance
} from '@/domains/users/hooks/useBarbeiro'
import { BarChart3, Calendar, Users, Bell, AlertTriangle } from 'lucide-react'

export default function BarbeiroPage() {
  return (
    <ProtectedRoute allowedRoles={['barbeiro']}>
      <BarbeiroDashboard />
    </ProtectedRoute>
  )
}

function BarbeiroDashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<'agenda' | 'clientes' | 'performance' | 'notificacoes'>('agenda')
  
  const barbeiroId = user?.id || 'mock-barbeiro-id'
  
  const { metricas, loading: loadingMetricas } = useBarbeiroMetrics(barbeiroId)
  const { agendamentos, loading: loadingAgendamentos, updateStatus } = useBarbeiroAgendamentos(barbeiroId)
  const { clientes, loading: loadingClientes } = useBarbeiroClientes(barbeiroId)
  const { notificacoes, loading: loadingNotificacoes, marcarComoLida } = useBarbeiroNotificacoes(barbeiroId)
  const { performance, loading: loadingPerformance } = useBarbeiroPerformance(barbeiroId)

  const handleViewClientHistory = (clienteNome: string) => {
    console.log('Ver histórico do cliente:', clienteNome)
    setActiveTab('clientes')
  }

  const sidebarItems = [
    { id: 'agenda', nome: 'Minha Agenda', icone: Calendar },
    { id: 'clientes', nome: 'Clientes', icone: Users },
    { id: 'performance', nome: 'Performance', icone: BarChart3 },
    { id: 'notificacoes', nome: 'Notificações', icone: Bell }
  ]

  const notificacaosPendentes = notificacoes.filter(n => !n.lida).length

  const headerActions = (
    <>
      {notificacoesPendentes > 0 && (
        <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
          <Bell className="h-4 w-4" />
          <span className="text-sm font-medium">{notificacoesPendentes} notificações</span>
        </div>
      )}
    </>
  )

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeSidebarItem={activeTab}
      onSidebarItemClick={(itemId) => setActiveTab(itemId as any)}
      title="Dashboard do Barbeiro"
      subtitle={`Bem-vindo, ${user?.nome}! Gerencie seus agendamentos e clientes.`}
      headerActions={headerActions}
    >
      {activeTab === 'agenda' && (
        <div className="space-y-8">
          {/* Métricas */}
          {loadingMetricas ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-theme-secondary p-6 rounded-lg border border-theme-primary animate-pulse">
                  <div className="h-4 bg-theme-tertiary rounded mb-4"></div>
                  <div className="h-8 bg-theme-tertiary rounded mb-2"></div>
                  <div className="h-3 bg-theme-tertiary rounded"></div>
                </div>
              ))}
            </div>
          ) : metricas ? (
            <BarberMetrics metricas={metricas} />
          ) : null}

          {/* Notificações Importantes */}
          {!loadingNotificacoes && notificacoes.filter(n => n.prioridade === 'alta' && !n.lida).length > 0 && (
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
              <div className="p-6 border-b border-theme-primary">
                <h2 className="text-xl font-semibold text-theme-primary flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  Alertas Importantes
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {notificacoes
                    .filter(n => n.prioridade === 'alta' && !n.lida)
                    .slice(0, 3)
                    .map((notificacao) => (
                      <div 
                        key={notificacao.id} 
                        className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                        onClick={() => marcarComoLida(notificacao.id)}
                      >
                        <h3 className="font-medium text-orange-900 dark:text-orange-300">{notificacao.titulo}</h3>
                        <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">{notificacao.descricao}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Agenda */}
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
              <PersonalSchedule 
                agendamentos={agendamentos}
                onUpdateStatus={updateStatus}
                onViewClientHistory={handleViewClientHistory}
              />
            )}
          </div>
        </div>
      )}

      {activeTab === 'clientes' && (
        <div>
          {loadingClientes ? (
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary p-6 animate-pulse">
              <div className="h-6 bg-theme-tertiary rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-theme-tertiary rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <ClientHistory clientes={clientes} />
          )}
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-8">
          <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
            <div className="p-6 border-b border-theme-primary">
              <h2 className="text-xl font-semibold text-theme-primary">
                Minha Performance Semanal
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
                      {metricas.agendamentosSemana}
                    </p>
                    <p className="text-theme-secondary">Agendamentos na Semana</p>
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

      {activeTab === 'notificacoes' && (
        <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary">
          <div className="p-6 border-b border-theme-primary">
            <h2 className="text-xl font-semibold text-theme-primary flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notificações
            </h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {loadingNotificacoes ? (
              <div className="p-6">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-theme-tertiary rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ) : notificacoes.length === 0 ? (
              <div className="p-6 text-center text-theme-tertiary">
                <Bell className="h-12 w-12 mx-auto mb-3 text-theme-muted" />
                <p>Nenhuma notificação no momento</p>
              </div>
            ) : (
              <div className="divide-y divide-theme-primary">
                {notificacoes.map((notificacao) => (
                  <div
                    key={notificacao.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-theme-hover ${
                      !notificacao.lida ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400' : ''
                    }`}
                    onClick={() => !notificacao.lida && marcarComoLida(notificacao.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-medium ${
                            notificacao.lida ? 'text-theme-tertiary' : 'text-theme-primary'
                          }`}>
                            {notificacao.titulo}
                          </p>
                          {!notificacao.lida && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          notificacao.lida ? 'text-theme-muted' : 'text-theme-secondary'
                        }`}>
                          {notificacao.descricao}
                        </p>
                        <p className="text-xs text-theme-muted mt-2">
                          {notificacao.criadoEm.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}