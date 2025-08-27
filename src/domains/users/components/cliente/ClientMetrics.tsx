'use client'

import { 
  Calendar, 
  DollarSign, 
  User, 
  Star
} from 'lucide-react'
import { MetricasCliente } from '../../types/cliente-dashboard'

import { LoadingGrid } from '@/shared/components/ui/Loading'
import { cn } from '@/shared/utils/cn'

interface ClientMetricsProps {
  metricas: MetricasCliente
  carregando?: boolean
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

export function ClientMetrics({ metricas, carregando }: ClientMetricsProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  if (carregando) {
    return <LoadingGrid items={4} />
  }

  const metrics = [
    {
      title: 'Agendamentos Hoje',
      value: metricas.totalAgendamentos,
      description: 'Agendamentos confirmados',
      icon: <Calendar className="h-5 w-5" />,
      iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
      borderColor: 'metric-card-blue'
    },
    {
      title: 'Barbeiros Favoritos',
      value: metricas.barbeirosFavoritos,
      description: 'Seus barbeiros preferidos',
      icon: <User className="h-5 w-5" />,
      iconColor: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
      borderColor: 'metric-card-purple'
    },
    {
      title: 'Total Investido',
      value: formatarMoeda(metricas.totalGasto),
      description: 'Valor total gasto',
      icon: <DollarSign className="h-5 w-5" />,
      iconColor: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
      borderColor: 'metric-card-green'
    },
    {
      title: 'Avaliação Média',
      value: metricas.avaliacaoMediaDada.toFixed(1),
      description: 'Suas avaliações dadas',
      icon: <Star className="h-5 w-5" />,
      iconColor: 'bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400',
      borderColor: 'metric-card-amber'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}