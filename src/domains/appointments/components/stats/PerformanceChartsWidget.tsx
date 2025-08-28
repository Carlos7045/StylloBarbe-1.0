'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { BarChart3, TrendingUp, Activity, Target } from 'lucide-react'
import { DayRevenue, WeekRevenue } from '../../hooks/useRealTimeStats'

interface PerformanceChartsWidgetProps {
  dailyRevenue: DayRevenue[]
  weeklyRevenue: WeekRevenue[]
  totalAppointmentsToday: number
  completedAppointmentsToday: number
  canceledAppointmentsToday: number
  isLoading: boolean
}

export function PerformanceChartsWidget({
  dailyRevenue,
  weeklyRevenue,
  totalAppointmentsToday,
  completedAppointmentsToday,
  canceledAppointmentsToday,
  isLoading
}: PerformanceChartsWidgetProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded">
            <BarChart3 className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Performance</h2>
            <p className="text-sm text-gray-400 mt-1">Gráficos e métricas</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="animate-pulse h-64 bg-gray-600 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-pulse h-48 bg-gray-600 rounded"></div>
            <div className="animate-pulse h-48 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Preparar dados para os gráficos
  const last7Days = dailyRevenue.slice(-7).map(day => ({
    ...day,
    date: new Date(day.date).toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit' 
    })
  }))

  const last4Weeks = weeklyRevenue.slice(-4).map((week, index) => ({
    ...week,
    week: `Sem ${index + 1}`
  }))

  // Dados do gráfico de pizza para status dos agendamentos
  const appointmentStatusData = [
    { name: 'Concluídos', value: completedAppointmentsToday, color: '#10b981' },
    { name: 'Cancelados', value: canceledAppointmentsToday, color: '#ef4444' },
    { name: 'Pendentes', value: totalAppointmentsToday - completedAppointmentsToday - canceledAppointmentsToday, color: '#f59e0b' }
  ].filter(item => item.value > 0)

  const completionRate = totalAppointmentsToday > 0 
    ? (completedAppointmentsToday / totalAppointmentsToday) * 100 
    : 0

  const cancellationRate = totalAppointmentsToday > 0 
    ? (canceledAppointmentsToday / totalAppointmentsToday) * 100 
    : 0

  // Custom tooltip para os gráficos
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white text-sm">
              <span style={{ color: entry.color }}>●</span>
              {` ${entry.dataKey === 'revenue' ? 'Receita' : 'Agendamentos'}: `}
              {entry.dataKey === 'revenue' 
                ? `R$ ${entry.value.toFixed(2)}`
                : entry.value
              }
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded">
            <BarChart3 className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Performance</h2>
            <p className="text-sm text-gray-400 mt-1">Gráficos e métricas</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Activity className="h-4 w-4" />
          <span>Tempo real</span>
        </div>
      </div>

      {/* Métricas de hoje */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-400">Taxa de Conclusão</span>
          </div>
          <p className="text-2xl font-bold text-green-400">
            {completionRate.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500">
            {completedAppointmentsToday} de {totalAppointmentsToday} agendamentos
          </p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-400">Agendamentos Hoje</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {totalAppointmentsToday}
          </p>
          <p className="text-xs text-gray-500">
            Total do dia
          </p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-4 w-4 text-red-400" />
            <span className="text-sm text-gray-400">Taxa de Cancelamento</span>
          </div>
          <p className="text-2xl font-bold text-red-400">
            {cancellationRate.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500">
            {canceledAppointmentsToday} cancelamentos
          </p>
        </div>
      </div>

      {/* Gráfico de receita dos últimos 7 dias */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-white mb-4">Receita - Últimos 7 dias</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de linha - Tendência semanal */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Tendência Semanal</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last4Weeks}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="week" 
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de pizza - Status dos agendamentos */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Status dos Agendamentos Hoje</h3>
          {appointmentStatusData.length > 0 ? (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={appointmentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {appointmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string) => [value, name]}
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #4b5563',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Activity className="h-8 w-8 mx-auto mb-2" />
                <p>Nenhum agendamento hoje</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legenda do gráfico de pizza */}
      {appointmentStatusData.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex flex-wrap gap-4 justify-center">
            {appointmentStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-300">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}