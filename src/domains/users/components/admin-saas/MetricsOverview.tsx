'use client'

import { TrendingUp, TrendingDown, Users, DollarSign, UserPlus, UserMinus } from 'lucide-react'
import { MetricasAssinatura } from '../../types/admin-saas'

interface MetricsOverviewProps {
  metricas: MetricasAssinatura
}

export function MetricsOverview({ metricas }: MetricsOverviewProps) {
  const cards = [
    {
      titulo: 'Barbearias Ativas',
      valor: metricas.totalBarbearias,
      subtitulo: `${metricas.barbeariasPagantes} pagantes`,
      icone: Users,
      cor: 'blue',
      tendencia: metricas.taxaCrescimento > 0 ? 'up' : 'down',
      percentual: Math.abs(metricas.taxaCrescimento)
    },
    {
      titulo: 'Receita Mensal',
      valor: `R$ ${metricas.receitaMensal.toLocaleString()}`,
      subtitulo: `R$ ${metricas.receitaAnual.toLocaleString()} anual`,
      icone: DollarSign,
      cor: 'green',
      tendencia: 'up' as const,
      percentual: 12.5
    },
    {
      titulo: 'Novos Cadastros',
      valor: metricas.novosCadastros,
      subtitulo: 'Este mês',
      icone: UserPlus,
      cor: 'purple',
      tendencia: 'up' as const,
      percentual: 8.2
    },
    {
      titulo: 'Cancelamentos',
      valor: metricas.cancelamentos,
      subtitulo: 'Este mês',
      icone: UserMinus,
      cor: 'red',
      tendencia: 'down' as const,
      percentual: 3.1
    }
  ]

  const getCorClasses = (cor: string) => {
    const cores = {
      blue: 'bg-blue-50 text-blue-900 border-blue-200',
      green: 'bg-green-50 text-green-900 border-green-200',
      purple: 'bg-purple-50 text-purple-900 border-purple-200',
      red: 'bg-red-50 text-red-900 border-red-200'
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icone
        const TrendIcon = card.tendencia === 'up' ? TrendingUp : TrendingDown
        
        return (
          <div 
            key={index}
            className={`p-6 rounded-lg border-2 ${getCorClasses(card.cor)} transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className="h-8 w-8" />
              <div className={`flex items-center text-sm ${
                card.tendencia === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendIcon className="h-4 w-4 mr-1" />
                {card.percentual}%
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium opacity-80 mb-1">
                {card.titulo}
              </h3>
              <p className="text-2xl font-bold mb-1">
                {card.valor}
              </p>
              <p className="text-sm opacity-70">
                {card.subtitulo}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}