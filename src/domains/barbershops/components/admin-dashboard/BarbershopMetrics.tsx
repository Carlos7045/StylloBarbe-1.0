'use client'

import { Calendar, DollarSign, Users, Clock, Star, TrendingUp } from 'lucide-react'
import { MetricasBarbearia } from '../../types/admin-dashboard'
import { cn } from '@/shared/utils/cn'

interface BarbershopMetricsProps {
  metricas: MetricasBarbearia
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
  return (
    <div 
      className={cn(
        "rounded-lg border border-theme-primary shadow-sm transition-all duration-200 bg-theme-secondary text-theme-primary hover:shadow-md",
        borderColor
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={cn('p-2 rounded-lg', iconColor)}>
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-xl font-bold text-theme-primary">
            {value}
          </p>
          <p className="text-xs font-medium text-theme-primary">
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

export function BarbershopMetrics({ metricas }: BarbershopMetricsProps) {
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
      description: `${metricas.proximosAgendamentos} próximos agendamentos`,
      icon: <Calendar className="h-5 w-5" />,
      iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
      borderColor: 'metric-card-blue'
    },
    {
      title: 'Receita Hoje',
      value: formatarMoeda(metricas.receitaHoje),
      description: `${formatarMoeda(metricas.receitaMes)} no mês`,
      icon: <DollarSign className="h-5 w-5" />,
      iconColor: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
      borderColor: 'metric-card-green'
    },
    {
      title: 'Clientes Atendidos',
      value: metricas.clientesAtendidos,
      description: 'Atendimentos de hoje',
      icon: <Users className="h-5 w-5" />,
      iconColor: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
      borderColor: 'metric-card-purple'
    },
    {
      title: 'Taxa de Ocupação',
      value: `${metricas.taxaOcupacao}%`,
      description: 'Ocupação de hoje',
      icon: <TrendingUp className="h-5 w-5" />,
      iconColor: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
      borderColor: 'metric-card-orange'
    },
    {
      title: 'Barbeiros Ativos',
      value: metricas.barbeirosAtivos,
      description: 'Trabalhando hoje',
      icon: <Clock className="h-5 w-5" />,
      iconColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
      borderColor: 'metric-card-indigo'
    },
    {
      title: 'Avaliação Média',
      value: metricas.avaliacaoMedia.toFixed(1),
      description: '⭐ Avaliação deste mês',
      icon: <Star className="h-5 w-5" />,
      iconColor: 'bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400',
      borderColor: 'metric-card-amber'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}