'use client'

import { RefreshCw } from 'lucide-react'
import { useRealTimeStats } from '../../hooks/useRealTimeStats'
import { BarberOccupancyWidget } from './BarberOccupancyWidget'
import { RevenueMetricsWidget } from './RevenueMetricsWidget'
import { PendingAlertsWidget } from './PendingAlertsWidget'
import { PerformanceChartsWidget } from './PerformanceChartsWidget'

interface RealTimeStatsPanelProps {
  barbeariaId: string
}

export function RealTimeStatsPanel({ barbeariaId }: RealTimeStatsPanelProps) {
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
    isLoading,
    error,
    refreshStats
  } = useRealTimeStats(barbeariaId)

  const handleDismissAlert = async (alertId: string) => {
    // TODO: Implementar dismissal de alerta
    console.log('Dispensar alerta:', alertId)
  }

  const handleViewAppointment = (agendamentoId: string) => {
    // TODO: Implementar navegação para agendamento
    console.log('Ver agendamento:', agendamentoId)
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg border border-red-500 p-6">
        <div className="text-center">
          <div className="text-red-400 mb-4">
            <RefreshCw className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Erro ao carregar estatísticas
          </h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={refreshStats}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header com botão de refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Estatísticas em Tempo Real
          </h1>
          <p className="text-gray-400">
            Acompanhe o desempenho da sua barbearia em tempo real
          </p>
        </div>
        <button
          onClick={refreshStats}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Grid principal de widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Taxa de ocupação por barbeiro */}
        <BarberOccupancyWidget
          occupancyData={barberOccupancy}
          isLoading={isLoading}
        />

        {/* Alertas pendentes */}
        <PendingAlertsWidget
          alerts={pendingAlerts}
          isLoading={isLoading}
          onDismissAlert={handleDismissAlert}
          onViewAppointment={handleViewAppointment}
        />
      </div>

      {/* Métricas de receita */}
      <RevenueMetricsWidget
        todayRevenue={todayRevenue}
        weekRevenue={weekRevenue}
        monthRevenue={monthRevenue}
        dailyRevenue={dailyRevenue}
        weeklyRevenue={weeklyRevenue}
        isLoading={isLoading}
      />

      {/* Gráficos de performance */}
      <PerformanceChartsWidget
        dailyRevenue={dailyRevenue}
        weeklyRevenue={weeklyRevenue}
        totalAppointmentsToday={totalAppointmentsToday}
        completedAppointmentsToday={completedAppointmentsToday}
        canceledAppointmentsToday={canceledAppointmentsToday}
        isLoading={isLoading}
      />

      {/* Rodapé com informações de atualização */}
      <div className="text-center text-sm text-gray-500">
        <p>
          Dados atualizados automaticamente a cada 30 segundos
        </p>
        <p className="mt-1">
          Última atualização: {new Date().toLocaleTimeString('pt-BR')}
        </p>
      </div>
    </div>
  )
}