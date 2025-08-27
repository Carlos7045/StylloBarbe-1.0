'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Phone, Scissors, Star, MessageSquare } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { AgendamentoBarbeiro } from '../../types/barbeiro-dashboard'

interface PersonalScheduleProps {
  agendamentos: AgendamentoBarbeiro[]
  onUpdateStatus: (id: string, status: AgendamentoBarbeiro['status']) => void
  onViewClientHistory: (clienteId: string) => void
}

export function PersonalSchedule({ agendamentos, onUpdateStatus, onViewClientHistory }: PersonalScheduleProps) {
  const [visualizacao, setVisualizacao] = useState<'hoje' | 'semana'>('hoje')
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')

  const hoje = new Date()
  const agendamentosFiltrados = agendamentos.filter(agendamento => {
    const dataAgendamento = new Date(agendamento.dataHora)
    
    // Filtro por período
    if (visualizacao === 'hoje') {
      if (dataAgendamento.toDateString() !== hoje.toDateString()) return false
    } else {
      const inicioSemana = new Date(hoje)
      inicioSemana.setDate(hoje.getDate() - hoje.getDay())
      const fimSemana = new Date(inicioSemana)
      fimSemana.setDate(inicioSemana.getDate() + 6)
      
      if (dataAgendamento < inicioSemana || dataAgendamento > fimSemana) return false
    }
    
    // Filtro por status
    if (filtroStatus !== 'todos' && agendamento.status !== filtroStatus) return false
    
    return true
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendado':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'confirmado':
        return <Calendar className="h-4 w-4 text-green-500" />
      case 'em_andamento':
        return <Scissors className="h-4 w-4 text-orange-500" />
      case 'concluido':
        return <Star className="h-4 w-4 text-green-600" />
      case 'cancelado':
        return <MessageSquare className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      agendado: 'Agendado',
      confirmado: 'Confirmado',
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      cancelado: 'Cancelado'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const getStatusBadgeClass = (status: string) => {
    const classes = {
      agendado: 'bg-blue-500/20 text-blue-400',
      confirmado: 'bg-green-500/20 text-green-400',
      em_andamento: 'bg-orange-500/20 text-orange-400',
      concluido: 'bg-green-500/20 text-green-400',
      cancelado: 'bg-red-500/20 text-red-400'
    }
    return classes[status as keyof typeof classes] || classes.agendado
  }

  const getNextActions = (status: string) => {
    switch (status) {
      case 'agendado':
        return ['confirmado', 'cancelado']
      case 'confirmado':
        return ['em_andamento', 'cancelado']
      case 'em_andamento':
        return ['concluido']
      default:
        return []
    }
  }

  const getActionLabel = (action: string) => {
    const labels = {
      confirmado: 'Confirmar',
      em_andamento: 'Iniciar',
      concluido: 'Finalizar',
      cancelado: 'Cancelar'
    }
    return labels[action as keyof typeof labels] || action
  }

  const getActionVariant = (action: string) => {
    switch (action) {
      case 'confirmado':
      case 'em_andamento':
      case 'concluido':
        return 'primary'
      case 'cancelado':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const agruparPorHorario = (agendamentos: AgendamentoBarbeiro[]) => {
    return agendamentos.sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      <div className="p-6 border-b border-theme-primary">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-theme-primary">
            Minha Agenda
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex bg-theme-tertiary rounded-lg p-1">
              <button
                onClick={() => setVisualizacao('hoje')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  visualizacao === 'hoje'
                    ? 'bg-amber-400 text-gray-900 shadow-sm'
                    : 'text-theme-secondary hover:text-theme-primary'
                }`}
              >
                Hoje
              </button>
              <button
                onClick={() => setVisualizacao('semana')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  visualizacao === 'semana'
                    ? 'bg-amber-400 text-gray-900 shadow-sm'
                    : 'text-theme-secondary hover:text-theme-primary'
                }`}
              >
                Semana
              </button>
            </div>
            
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-3 py-2 border border-theme-primary bg-theme-tertiary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="todos">Todos os status</option>
              <option value="agendado">Agendado</option>
              <option value="confirmado">Confirmado</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-theme-primary">
        {agendamentosFiltrados.length === 0 ? (
          <div className="p-8 text-center text-theme-tertiary">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-theme-muted" />
            <p>Nenhum agendamento encontrado para o período selecionado</p>
          </div>
        ) : (
          agruparPorHorario(agendamentosFiltrados).map((agendamento) => (
            <div key={agendamento.id} className="p-6 hover:bg-theme-hover transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(agendamento.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(agendamento.status)}`}>
                        {getStatusText(agendamento.status)}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-theme-primary">
                      {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    {agendamento.isNovoCliente && (
                      <span className="bg-purple-500/20 text-purple-400 text-xs font-medium px-2 py-1 rounded-full">
                        Novo Cliente
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm font-medium text-theme-primary">
                          {agendamento.clienteNome}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-secondary">
                          {agendamento.clienteTelefone}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Scissors className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-primary">
                          {agendamento.servicoNome}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-secondary">
                          {agendamento.duracao} minutos
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                      R$ {agendamento.valorTotal.toLocaleString()}
                    </div>
                    
                    {agendamento.observacoes && (
                      <div className="text-sm text-theme-tertiary italic max-w-xs truncate">
                        "{agendamento.observacoes}"
                      </div>
                    )}
                  </div>

                  {agendamento.ultimoAtendimento && (
                    <div className="mt-2 text-xs text-theme-muted">
                      Último atendimento: {agendamento.ultimoAtendimento.toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewClientHistory(agendamento.clienteNome)}
                  >
                    Histórico
                  </Button>
                  
                  {getNextActions(agendamento.status).map((action) => (
                    <Button
                      key={action}
                      variant={getActionVariant(action) as any}
                      size="sm"
                      onClick={() => onUpdateStatus(agendamento.id, action as AgendamentoBarbeiro['status'])}
                    >
                      {getActionLabel(action)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}