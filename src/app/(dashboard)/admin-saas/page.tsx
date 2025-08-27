'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { AdminSaasOnlyRoute } from '@/domains/auth'
import { DashboardLayout } from '@/shared/components/layout'
import { MetricsOverview } from '@/domains/users/components/admin-saas/MetricsOverview'
import { BarbershopsList } from '@/domains/users/components/admin-saas/BarbershopsList'
import { AlertsPanel } from '@/domains/users/components/admin-saas/AlertsPanel'
import { RevenueChart } from '@/shared/components/charts/RevenueChart'
import { GrowthChart } from '@/shared/components/charts/GrowthChart'
import { 
  useAdminSaasMetrics, 
  useAdminSaasBarbearias, 
  useAdminSaasCharts,
  useAdminSaasAlertas 
} from '@/domains/users/hooks/useAdminSaas'
import { BarChart3, Users, Bell, TrendingUp } from 'lucide-react'

export default function AdminSaasPage() {
  return (
    <AdminSaasOnlyRoute>
      <AdminSaasDashboard />
    </AdminSaasOnlyRoute>
  )
}

function AdminSaasDashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<'overview' | 'barbearias' | 'relatorios' | 'alertas'>('overview')
  
  const { metricas, loading: loadingMetricas } = useAdminSaasMetrics()
  const { barbearias, loading: loadingBarbearias, toggleStatus } = useAdminSaasBarbearias()
  const { dadosGrafico, loading: loadingCharts } = useAdminSaasCharts()
  const { alertas, loading: loadingAlertas, marcarComoLido } = useAdminSaasAlertas()

  const handleViewBarbeariaDetails = (id: string) => {
    console.log('Ver detalhes da barbearia:', id)
    // Implementar modal ou navegação para detalhes
  }

  const sidebarItems = [
    { id: 'overview', nome: 'Visão Geral', icone: BarChart3 },
    { id: 'barbearias', nome: 'Barbearias', icone: Users },
    { id: 'relatorios', nome: 'Relatórios', icone: TrendingUp },
    { id: 'alertas', nome: 'Alertas', icone: Bell }
  ]

  const alertasNaoLidos = alertas.filter(a => !a.lido).length

  const headerActions = (
    <>
      {alertasNaoLidos > 0 && (
        <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
          <Bell className="h-4 w-4" />
          <span className="text-sm font-medium">{alertasNaoLidos} alertas</span>
        </div>
      )}
    </>
  )

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeSidebarItem={activeTab}
      onSidebarItemClick={(itemId) => setActiveTab(itemId as any)}
      title="Dashboard Admin SaaS"
      subtitle={`Bem-vindo, ${user?.nome}! Gerencie todas as barbearias da plataforma.`}
      headerActions={headerActions}
    >
      {activeTab === 'overview' && (
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
            <MetricsOverview metricas={metricas} />
          ) : null}

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-theme-secondary p-6 rounded-lg shadow-sm border border-theme-primary">
              <h3 className="text-lg font-semibold text-theme-primary mb-4">
                Evolução da Receita
              </h3>
              {loadingCharts ? (
                <div className="h-80 bg-theme-tertiary rounded animate-pulse"></div>
              ) : (
                <RevenueChart data={dadosGrafico} />
              )}
            </div>

            <div className="bg-theme-secondary p-6 rounded-lg shadow-sm border border-theme-primary">
              <h3 className="text-lg font-semibold text-theme-primary mb-4">
                Crescimento de Barbearias
              </h3>
              {loadingCharts ? (
                <div className="h-80 bg-theme-tertiary rounded animate-pulse"></div>
              ) : (
                <GrowthChart data={dadosGrafico} />
              )}
            </div>
          </div>

          {/* Alertas Resumo */}
          <div className="lg:w-1/2">
            {loadingAlertas ? (
              <div className="bg-theme-secondary p-6 rounded-lg shadow-sm border border-theme-primary animate-pulse">
                <div className="h-6 bg-theme-tertiary rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-theme-tertiary rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <AlertsPanel 
                alertas={alertas.slice(0, 5)} 
                onMarkAsRead={marcarComoLido} 
              />
            )}
          </div>
        </div>
      )}

      {activeTab === 'barbearias' && (
        <div>
          {loadingBarbearias ? (
            <div className="bg-theme-secondary rounded-lg shadow-sm border border-theme-primary p-6 animate-pulse">
              <div className="h-6 bg-theme-tertiary rounded mb-4"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-theme-tertiary rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <BarbershopsList 
              barbearias={barbearias}
              onToggleStatus={toggleStatus}
              onViewDetails={handleViewBarbeariaDetails}
            />
          )}
        </div>
      )}

      {activeTab === 'relatorios' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-theme-secondary p-6 rounded-lg shadow-sm border border-theme-primary">
              <h3 className="text-lg font-semibold text-theme-primary mb-4">
                Receita por Período
              </h3>
              {loadingCharts ? (
                <div className="h-80 bg-theme-tertiary rounded animate-pulse"></div>
              ) : (
                <RevenueChart data={dadosGrafico} />
              )}
            </div>

            <div className="bg-theme-secondary p-6 rounded-lg shadow-sm border border-theme-primary">
              <h3 className="text-lg font-semibold text-theme-primary mb-4">
                Análise de Crescimento
              </h3>
              {loadingCharts ? (
                <div className="h-80 bg-theme-tertiary rounded animate-pulse"></div>
              ) : (
                <GrowthChart data={dadosGrafico} />
              )}
            </div>
          </div>

          {/* Métricas detalhadas */}
          {metricas && (
            <div className="bg-theme-secondary p-6 rounded-lg shadow-sm border border-theme-primary">
              <h3 className="text-lg font-semibold text-theme-primary mb-4">
                Resumo Financeiro
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    R$ {metricas.receitaMensal.toLocaleString()}
                  </p>
                  <p className="text-theme-secondary">Receita Mensal</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    R$ {metricas.receitaAnual.toLocaleString()}
                  </p>
                  <p className="text-theme-secondary">Receita Anual</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {metricas.taxaCrescimento.toFixed(1)}%
                  </p>
                  <p className="text-theme-secondary">Taxa de Crescimento</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'alertas' && (
        <div>
          {loadingAlertas ? (
            <div className="bg-theme-secondary p-6 rounded-lg shadow-sm border border-theme-primary animate-pulse">
              <div className="h-6 bg-theme-tertiary rounded mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-theme-tertiary rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <AlertsPanel 
              alertas={alertas} 
              onMarkAsRead={marcarComoLido} 
            />
          )}
        </div>
      )}
    </DashboardLayout>
  )
}