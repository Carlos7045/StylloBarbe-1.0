'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { AdminSaasOnlyRoute } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'
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
  const { user, logout } = useUser()
  const [activeTab, setActiveTab] = useState<'overview' | 'barbearias' | 'relatorios' | 'alertas'>('overview')
  
  const { metricas, loading: loadingMetricas } = useAdminSaasMetrics()
  const { barbearias, loading: loadingBarbearias, toggleStatus } = useAdminSaasBarbearias()
  const { dadosGrafico, loading: loadingCharts } = useAdminSaasCharts()
  const { alertas, loading: loadingAlertas, marcarComoLido } = useAdminSaasAlertas()

  const handleViewBarbeariaDetails = (id: string) => {
    console.log('Ver detalhes da barbearia:', id)
    // Implementar modal ou navegação para detalhes
  }

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'barbearias', label: 'Barbearias', icon: Users },
    { id: 'relatorios', label: 'Relatórios', icon: TrendingUp },
    { id: 'alertas', label: 'Alertas', icon: Bell }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Admin SaaS
              </h1>
              <p className="text-gray-600 mt-1">
                Bem-vindo, {user?.nome}! Gerencie todas as barbearias da plataforma.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={logout}
            >
              Sair
            </Button>
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
                  {tab.id === 'alertas' && alertas.filter(a => !a.lido).length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {alertas.filter(a => !a.lido).length}
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Métricas */}
            {loadingMetricas ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-lg border animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : metricas ? (
              <MetricsOverview metricas={metricas} />
            ) : null}

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Evolução da Receita
                </h3>
                {loadingCharts ? (
                  <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
                ) : (
                  <RevenueChart data={dadosGrafico} />
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Crescimento de Barbearias
                </h3>
                {loadingCharts ? (
                  <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
                ) : (
                  <GrowthChart data={dadosGrafico} />
                )}
              </div>
            </div>

            {/* Alertas Resumo */}
            <div className="lg:w-1/2">
              {loadingAlertas ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded"></div>
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
              <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded"></div>
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
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Receita por Período
                </h3>
                {loadingCharts ? (
                  <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
                ) : (
                  <RevenueChart data={dadosGrafico} />
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Análise de Crescimento
                </h3>
                {loadingCharts ? (
                  <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
                ) : (
                  <GrowthChart data={dadosGrafico} />
                )}
              </div>
            </div>

            {/* Métricas detalhadas */}
            {metricas && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumo Financeiro
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      R$ {metricas.receitaMensal.toLocaleString()}
                    </p>
                    <p className="text-gray-600">Receita Mensal</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      R$ {metricas.receitaAnual.toLocaleString()}
                    </p>
                    <p className="text-gray-600">Receita Anual</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">
                      {metricas.taxaCrescimento.toFixed(1)}%
                    </p>
                    <p className="text-gray-600">Taxa de Crescimento</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'alertas' && (
          <div>
            {loadingAlertas ? (
              <div className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded"></div>
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
      </div>
    </div>
  )
}