'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'
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
import { ThemeDropdown } from '@/shared/components/ui/ThemeDropdown'
import { BarChart3, Calendar, Users, Bell, AlertTriangle } from 'lucide-react'

export default function BarbeiroPage() {
  return (
    <ProtectedRoute allowedRoles={['barbeiro']}>
      <BarbeiroDashboard />
    </ProtectedRoute>
  )
}

function BarbeiroDashboard() {
  const { user, logout } = useUser()
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

  const tabs = [
    { id: 'agenda', label: 'Minha Agenda', icon: Calendar },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'notificacoes', label: 'Notificações', icon: Bell }
  ]

  const notificacaosPendentes = notificacoes.filter(n => !n.lida).length

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Header */}
      <div className="bg-theme-secondary shadow-sm border-b border-theme-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-theme-primary">
                Minha Agenda
              </h1>
              <p className="text-theme-secondary mt-1">
                Bem-vindo, {user?.nome}! Gerencie seus agendamentos e clientes.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {notificacoesPendentes > 0 && (
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Bell className="h-4 w-4" />
                  <span className="text-sm font-medium">{notificacoesPendentes} notificações</span>
                </div>
              )}
              
              <ThemeDropdown size="sm" variant="outline" />
              
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
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                      : 'border-transparent text-theme-tertiary hover:text-theme-secondary hover:border-theme-secondary'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                  {tab.id === 'notificacoes' && notificacoesPendentes > 0 && (
                    <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {notificacoesPendentes}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </div>
    </div>
  )
}