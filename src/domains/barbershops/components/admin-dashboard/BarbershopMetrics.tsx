'use client'

import { Calendar, DollarSign, Users, Clock, Star, TrendingUp } from 'lucide-react'
import { MetricasBarbearia } from '../../types/admin-dashboard'

interface BarbershopMetricsProps {
  metricas: MetricasBarbearia
}

export function BarbershopMetrics({ metricas }: BarbershopMetricsProps) {
  const cards = [
    {
      titulo: 'Agendamentos Hoje',
      valor: metricas.agendamentosHoje,
      subtitulo: `${metricas.proximosAgendamentos} próximos`,
      icone: Calendar,
      cor: 'blue',
      destaque: true
    },
    {
      titulo: 'Receita Hoje',
      valor: `R$ ${metricas.receitaHoje.toLocaleString()}`,
      subtitulo: `R$ ${metricas.receitaMes.toLocaleString()} no mês`,
      icone: DollarSign,
      cor: 'green',
      destaque: false
    },
    {
      titulo: 'Clientes Atendidos',
      valor: metricas.clientesAtendidos,
      subtitulo: 'Hoje',
      icone: Users,
      cor: 'purple',
      destaque: false
    },
    {
      titulo: 'Taxa de Ocupação',
      valor: `${metricas.taxaOcupacao}%`,
      subtitulo: 'Hoje',
      icone: TrendingUp,
      cor: 'orange',
      destaque: false
    },
    {
      titulo: 'Barbeiros Ativos',
      valor: metricas.barbeirosAtivos,
      subtitulo: 'Trabalhando hoje',
      icone: Clock,
      cor: 'indigo',
      destaque: false
    },
    {
      titulo: 'Avaliação Média',
      valor: metricas.avaliacaoMedia.toFixed(1),
      subtitulo: '⭐ Este mês',
      icone: Star,
      cor: 'yellow',
      destaque: false
    }
  ]

  const getCorClasses = (cor: string, destaque: boolean) => {
    const cores = {
      blue: 'bg-blue-500/20 text-blue-400',
      green: 'bg-green-500/20 text-green-400',
      purple: 'bg-purple-500/20 text-purple-400',
      orange: 'bg-orange-500/20 text-orange-400',
      indigo: 'bg-indigo-500/20 text-indigo-400',
      yellow: 'bg-amber-400/20 text-amber-400'
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icone
        
        return (
          <div 
            key={index}
            className={`bg-gray-800 rounded-lg border border-gray-700 p-6 transition-all hover:shadow-lg ${
              card.destaque ? 'shadow-lg scale-105' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded ${getCorClasses(card.cor, card.destaque)}`}>
                <Icon className={`h-6 w-6 ${
                  card.cor === 'blue' ? 'text-blue-400' :
                  card.cor === 'green' ? 'text-green-400' :
                  card.cor === 'purple' ? 'text-purple-400' :
                  card.cor === 'orange' ? 'text-orange-400' :
                  card.cor === 'indigo' ? 'text-indigo-400' :
                  'text-amber-400'
                }`} />
              </div>
              {card.destaque && (
                <div className="bg-amber-400/20 px-2 py-1 rounded-full">
                  <span className="text-xs font-medium text-amber-400">HOJE</span>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-2xl font-bold text-white mb-1">
                {card.valor}
              </p>
              <p className="text-sm text-gray-400">
                {card.titulo}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {card.subtitulo}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}