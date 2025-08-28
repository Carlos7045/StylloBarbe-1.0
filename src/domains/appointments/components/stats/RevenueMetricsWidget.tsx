'use client'

import { DollarSign, TrendingUp, Calendar, BarChart3 } from 'lucide-react'
import { DayRevenue, WeekRevenue } from '../../hooks/useRealTimeStats'

interface RevenueMetricsWidgetProps {
  todayRevenue: number
  weekRevenue: number
  monthRevenue: number
  dailyRevenue: DayRevenue[]
  weeklyRevenue: WeekRevenue[]
  isLoading: boolean
}

export function RevenueMetricsWidget({
  todayRevenue,
  weekRevenue,
  monthRevenue,
  dailyRevenue,
  weeklyRevenue,
  isLoading
}: RevenueMetricsWidgetProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded">
            <DollarSign className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Receita</h2>
            <p className="text-sm text-gray-400 mt-1">Métricas financeiras</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-600 rounded w-16 mb-2"></div>
              <div className="h-8 bg-gray-600 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-600 rounded w-20"></div>
            </div>
          ))}
        </div>

        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded w-32 mb-4"></div>
          <div className="h-32 bg-gray-600 rounded"></div>
        </div>
      </div>
    )
  }

  // Calcular variação percentual da semana
  const previousWeekRevenue = weeklyRevenue.length >= 2 ? weeklyRevenue[weeklyRevenue.length - 2].revenue : 0
  const weekGrowth = previousWeekRevenue > 0 
    ? ((weekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100 
    : 0

  // Calcular variação percentual do dia
  const yesterday = dailyRevenue.length >= 2 ? dailyRevenue[dailyRevenue.length - 2].revenue : 0
  const dayGrowth = yesterday > 0 
    ? ((todayRevenue - yesterday) / yesterday) * 100 
    : 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-400'
    if (growth < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? '↗' : '↘'
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500/20 rounded">
            <DollarSign className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Receita</h2>
            <p className="text-sm text-gray-400 mt-1">Métricas financeiras</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <BarChart3 className="h-4 w-4" />
          <span>Tempo real</span>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-400">Hoje</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(todayRevenue)}
          </p>
          <div className="flex items-center space-x-1">
            <span className={`text-sm ${getGrowthColor(dayGrowth)}`}>
              {getGrowthIcon(dayGrowth)} {Math.abs(dayGrowth).toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500">vs ontem</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-gray-400">Esta Semana</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(weekRevenue)}
          </p>
          <div className="flex items-center space-x-1">
            <span className={`text-sm ${getGrowthColor(weekGrowth)}`}>
              {getGrowthIcon(weekGrowth)} {Math.abs(weekGrowth).toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500">vs semana anterior</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-orange-400" />
            <span className="text-sm text-gray-400">Este Mês</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(monthRevenue)}
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-400">
              Meta: {formatCurrency(monthRevenue * 1.2)}
            </span>
          </div>
        </div>
      </div>

      {/* Gráfico simples dos últimos 7 dias */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Últimos 7 dias</h3>
        <div className="space-y-3">
          {dailyRevenue.slice(-7).map((day, index) => {
            const maxRevenue = Math.max(...dailyRevenue.slice(-7).map(d => d.revenue))
            const percentage = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0
            
            return (
              <div key={day.date} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {new Date(day.date).toLocaleDateString('pt-BR', { 
                      weekday: 'short', 
                      day: '2-digit', 
                      month: '2-digit' 
                    })}
                  </span>
                  <div className="text-right">
                    <span className="text-sm text-white font-medium">
                      {formatCurrency(day.revenue)}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {day.appointments} agend.
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Resumo */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Média diária:</span>
            <span className="text-white font-medium">
              {formatCurrency(dailyRevenue.length > 0 
                ? dailyRevenue.reduce((acc, d) => acc + d.revenue, 0) / dailyRevenue.length 
                : 0
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Melhor dia:</span>
            <span className="text-white font-medium">
              {formatCurrency(Math.max(...dailyRevenue.map(d => d.revenue), 0))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}