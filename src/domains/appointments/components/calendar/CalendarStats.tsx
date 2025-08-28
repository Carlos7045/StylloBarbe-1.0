'use client'

import { useMemo } from 'react'
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react'
import { Appointment } from '../../types/appointment'

interface CalendarStatsProps {
  appointments: Appointment[]
}

export function CalendarStats({ appointments }: CalendarStatsProps) {
  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Agendamentos de hoje
    const todayAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.dataHora)
      aptDate.setHours(0, 0, 0, 0)
      return aptDate.getTime() === today.getTime()
    })

    // Estatísticas por status
    const statusCounts = appointments.reduce((acc, apt) => {
      acc[apt.status] = (acc[apt.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Receita total
    const receitaTotal = appointments
      .filter(apt => apt.status === 'concluido')
      .reduce((total, apt) => total + apt.valorTotal, 0)

    // Receita de hoje
    const receitaHoje = todayAppointments
      .filter(apt => apt.status === 'concluido')
      .reduce((total, apt) => total + apt.valorTotal, 0)

    // Taxa de ocupação (agendamentos confirmados vs total de slots disponíveis)
    const agendamentosConfirmados = appointments.filter(apt => 
      ['confirmado', 'em_andamento', 'concluido'].includes(apt.status)
    ).length
    
    // Assumindo 8 slots por dia (8h às 18h) e 6 dias por semana
    const slotsDisponiveis = 8 * 6 * 4 // 4 semanas
    const taxaOcupacao = Math.round((agendamentosConfirmados / slotsDisponiveis) * 100)

    return {
      totalAgendamentos: appointments.length,
      agendamentosHoje: todayAppointments.length,
      agendamentosConfirmados: statusCounts.confirmado || 0,
      agendamentosConcluidos: statusCounts.concluido || 0,
      agendamentosCancelados: statusCounts.cancelado || 0,
      agendamentosEmAndamento: statusCounts.em_andamento || 0,
      receitaTotal,
      receitaHoje,
      taxaOcupacao: Math.min(taxaOcupacao, 100)
    }
  }, [appointments])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Agendamentos de Hoje */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-500/20 rounded">
            <Calendar className="h-6 w-6 text-blue-400" />
          </div>
          <span className="text-xs text-gray-500">Hoje</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-white mb-1">{stats.agendamentosHoje}</p>
          <p className="text-sm text-gray-400">Agendamentos Hoje</p>
          <p className="text-xs text-gray-500 mt-1">
            Total: {stats.totalAgendamentos}
          </p>
        </div>
      </div>

      {/* Agendamentos Confirmados */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-green-500/20 rounded">
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
          <span className="text-xs text-gray-500">Status</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-white mb-1">{stats.agendamentosConfirmados}</p>
          <p className="text-sm text-gray-400">Confirmados</p>
          <p className="text-xs text-gray-500 mt-1">
            Concluídos: {stats.agendamentosConcluidos}
          </p>
        </div>
      </div>

      {/* Receita */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-yellow-500/20 rounded">
            <DollarSign className="h-6 w-6 text-yellow-400" />
          </div>
          <span className="text-xs text-gray-500">Financeiro</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-white mb-1">
            R$ {stats.receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-400">Receita Total</p>
          <p className="text-xs text-gray-500 mt-1">
            Hoje: R$ {stats.receitaHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Taxa de Ocupação */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-500/20 rounded">
            <TrendingUp className="h-6 w-6 text-purple-400" />
          </div>
          <span className="text-xs text-gray-500">Performance</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-white mb-1">{stats.taxaOcupacao}%</p>
          <p className="text-sm text-gray-400">Taxa de Ocupação</p>
          <p className="text-xs text-gray-500 mt-1">
            Em andamento: {stats.agendamentosEmAndamento}
          </p>
        </div>
      </div>
    </div>
  )
}