'use client'

import { Calendar, DollarSign, Users, Star, Clock, TrendingUp } from 'lucide-react'
import { MetricasBarbeiro } from '../../types/barbeiro-dashboard'
import { cn } from '@/shared/utils/cn'

interface BarberMetricsProps {
  metricas: MetricasBarbeiro
}

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  iconColor: string
  borderColor: string
}

function MetricCard({ title, value, description, icon, iconColor, borderColor }: MetricCardProps) {
  // Mapear cores para valores CSS diretos
  const getBorderStyle = (borderColor: string) => {
    const colorMap: Record<string, string> = {
      'border-l-blue-500': '#3b82f6',
      'border-l-green-500': '#10b981',
      'border-l-purple-500': '#8b5cf6',
      'border-l-amber-400': '#fbbf24'
    }
    return colorMap[borderColor] || '#6b7280'
  }

  return (
    <div 
      className="rounded-lg border border-theme-primary shadow-sm transition-all duration-200 bg-theme-secondary text-theme-primary hover:shadow-md"
      style={{ 
        borderLeft: `4px solid ${getBorderStyle(borderColor)}` 
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn('p-3 rounded-lg', iconColor)}>
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-theme-primary">
            {value}
          </p>
          <p className="text-sm font-medium text-theme-primary">
            {title}
          </p>
          <p className="text-xs text-theme-secondary">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function BarberMetrics({ metricas }: BarberMetricsProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const metrics = [
    {
      title: 'Agendamentos Hoje',
      value: metricas.agendamentosHoje,
      description: `${metricas.agendamentosSemana} esta semana`,
      icon: <Calendar className="h-6 w-6" />,
      iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
      borderColor: 'border-l-blue-500'
    },
    {
      title: 'Receita Hoje',
      value: formatarMoeda(metricas.receitaHoje),
      description: `${formatarMoeda(metricas.receitaSemana)} na semana`,
      icon: <DollarSign className="h-6 w-6" />,
      iconColor: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
      borderColor: 'border-l-green-500'
    },
    {
      title: 'Clientes Atendidos',
      value: metricas.clientesAtendidos,
      description: 'Atendimentos de hoje',
      icon: <Users className="h-6 w-6" />,
      iconColor: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
      borderColor: 'border-l-purple-500'
    },
    {
      title: 'Avaliação Média',
      value: metricas.avaliacaoMedia.toFixed(1),
      description: `⭐ ${metricas.totalAvaliacoes} avaliações`,
      icon: <Star className="h-6 w-6" />,
      iconColor: 'bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400',
      borderColor: 'border-l-amber-400'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Próximo Agendamento */}
      {metricas.proximoAgendamento && (
        <div className="bg-amber-400 p-6 rounded-lg text-gray-900 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-gray-900" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Próximo Agendamento</h3>
                <p className="text-gray-800">
                  {metricas.proximoAgendamento.toLocaleString('pt-BR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {Math.ceil((metricas.proximoAgendamento.getTime() - new Date().getTime()) / (1000 * 60))} min
              </p>
              <p className="text-gray-800">para começar</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}