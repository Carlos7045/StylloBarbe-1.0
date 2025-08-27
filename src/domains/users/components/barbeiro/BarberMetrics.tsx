'use client'

import { Calendar, DollarSign, Users, Star, Clock, TrendingUp } from 'lucide-react'
import { MetricasBarbeiro } from '../../types/barbeiro-dashboard'

interface BarberMetricsProps {
  metricas: MetricasBarbeiro
}

export function BarberMetrics({ metricas }: BarberMetricsProps) {
  const cards = [
    {
      titulo: 'Agendamentos Hoje',
      valor: metricas.agendamentosHoje,
      subtitulo: `${metricas.agendamentosSemana} esta semana`,
      icone: Calendar,
      cor: 'blue',
      destaque: true
    },
    {
      titulo: 'Receita Hoje',
      valor: `R$ ${metricas.receitaHoje.toLocaleString()}`,
      subtitulo: `R$ ${metricas.receitaSemana.toLocaleString()} na semana`,
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
      titulo: 'Avaliação Média',
      valor: metricas.avaliacaoMedia.toFixed(1),
      subtitulo: `${metricas.totalAvaliacoes} avaliações`,
      icone: Star,
      cor: 'yellow',
      destaque: false
    }
  ]

  const getCorClasses = (cor: string, destaque: boolean) => {
    const cores = {
      blue: destaque ? 'bg-blue-500 text-white dark:bg-blue-500 dark:text-white' : 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30',
      green: destaque ? 'bg-green-500 text-white dark:bg-green-500 dark:text-white' : 'bg-green-50 text-green-900 border-green-200 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30',
      purple: destaque ? 'bg-purple-500 text-white dark:bg-purple-500 dark:text-white' : 'bg-purple-50 text-purple-900 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
      yellow: destaque ? 'bg-amber-400 text-gray-900 dark:bg-amber-400 dark:text-gray-900' : 'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-amber-400/20 dark:text-amber-400 dark:border-amber-400/30'
    }
    return cores[cor as keyof typeof cores] || cores.blue
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icone
        
        return (
          <div 
            key={index}
            className={`p-6 rounded-lg border transition-all hover:shadow-lg bg-gray-800 border-gray-700 ${
              card.destaque ? 'shadow-lg scale-105' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded ${
                card.cor === 'blue' ? 'bg-blue-500/20' :
                card.cor === 'green' ? 'bg-green-500/20' :
                card.cor === 'purple' ? 'bg-purple-500/20' :
                'bg-amber-400/20'
              }`}>
                <Icon className={`h-6 w-6 ${
                  card.cor === 'blue' ? 'text-blue-400' :
                  card.cor === 'green' ? 'text-green-400' :
                  card.cor === 'purple' ? 'text-purple-400' :
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

      {/* Próximo Agendamento */}
      {metricas.proximoAgendamento && (
        <div className="col-span-full bg-amber-400 p-6 rounded-lg text-gray-900">
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