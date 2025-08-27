'use client'

import { Building2, DollarSign, Users, TrendingUp, Calendar, Star } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface MetricasSaas {
  totalBarbearias: number
  barbeariasPendentes: number
  receitaMensal: number
  receitaAnual: number
  totalUsuarios: number
  agendamentosMes: number
  taxaCrescimento: number
  avaliacaoMedia: number
}

interface MetricsOverviewProps {
  metricas: MetricasSaas
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
      'border-l-orange-500': '#f97316',
      'border-l-indigo-500': '#6366f1',
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

export function MetricsOverview({ metricas }: MetricsOverviewProps) {
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const metrics = [
    {
      title: 'Total de Barbearias',
      value: metricas.totalBarbearias,
      description: `${metricas.barbeariasPendentes} pendentes de aprovação`,
      icon: <Building2 className="h-6 w-6" />,
      iconColor: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
      borderColor: 'border-l-blue-500'
    },
    {
      title: 'Receita Mensal',
      value: formatarMoeda(metricas.receitaMensal),
      description: `${formatarMoeda(metricas.receitaAnual)} anual`,
      icon: <DollarSign className="h-6 w-6" />,
      iconColor: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
      borderColor: 'border-l-green-500'
    },
    {
      title: 'Total de Usuários',
      value: metricas.totalUsuarios.toLocaleString(),
      description: 'Ativos na plataforma',
      icon: <Users className="h-6 w-6" />,
      iconColor: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
      borderColor: 'border-l-purple-500'
    },
    {
      title: 'Agendamentos/Mês',
      value: metricas.agendamentosMes.toLocaleString(),
      description: 'Total processados',
      icon: <Calendar className="h-6 w-6" />,
      iconColor: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
      borderColor: 'border-l-orange-500'
    },
    {
      title: 'Taxa de Crescimento',
      value: `${metricas.taxaCrescimento.toFixed(1)}%`,
      description: 'Crescimento mensal',
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
      borderColor: 'border-l-indigo-500'
    },
    {
      title: 'Avaliação Média',
      value: metricas.avaliacaoMedia.toFixed(1),
      description: '⭐ Avaliação da plataforma',
      icon: <Star className="h-6 w-6" />,
      iconColor: 'bg-amber-100 text-amber-600 dark:bg-amber-400/20 dark:text-amber-400',
      borderColor: 'border-l-amber-400'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}