'use client'

import { useState } from 'react'
import { Clock, User, Scissors, Phone, CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { AgendamentoResumo } from '../../types/admin-dashboard'

interface TodayAppointmentsProps {
  agendamentos: AgendamentoResumo[]
  onUpdateStatus: (id: string, status: AgendamentoResumo['status']) => void
  onViewDetails: (id: string) => void
}

export function TodayAppointments({ agendamentos, onUpdateStatus, onViewDetails }: TodayAppointmentsProps) {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')

  const agendamentosFiltrados = agendamentos.filter(agendamento => {
    if (filtroStatus === 'todos') return true
    return agendamento.status === filtroStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendado':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'confirmado':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'em_andamento':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case 'concluido':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'cancelado':
        return <XCircle className="h-4 w-4 text-red-500" />
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

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      <div className="p-4 border-b border-theme-primary">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <h2 className="text-lg font-semibold text-theme-primary">
            Agendamentos de Hoje
          </h2>
          
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-2 py-1 text-sm border border-theme-primary bg-theme-tertiary text-theme-primary rounded focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="todos">Todos os status</option>
            <option value="agendado">Agendado</option>
            <option value="confirmado">Confirmado</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-theme-primary">
        {agendamentosFiltrados.length === 0 ? (
          <div className="p-6 text-center text-theme-tertiary">
            <Calendar className="h-10 w-10 mx-auto mb-2 text-theme-muted" />
            <p className="text-sm">Nenhum agendamento encontrado para hoje</p>
          </div>
        ) : (
          agendamentosFiltrados.map((agendamento) => (
            <div key={agendamento.id} className="p-4 hover:bg-theme-hover transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(agendamento.status)}
                      <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${getStatusBadgeClass(agendamento.status)}`}>
                        {getStatusText(agendamento.status)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-theme-primary">
                      {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      R$ {agendamento.valorTotal.toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3 text-theme-tertiary" />
                        <span className="text-sm font-medium text-theme-primary">
                          {agendamento.clienteNome}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3 text-theme-tertiary" />
                        <span className="text-xs text-theme-secondary">
                          {agendamento.clienteTelefone}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Scissors className="h-3 w-3 text-theme-tertiary" />
                        <span className="text-sm text-theme-primary">
                          {agendamento.servicoNome}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3 text-theme-tertiary" />
                        <span className="text-xs text-theme-secondary">
                          {agendamento.barbeiroNome}
                        </span>
                      </div>
                    </div>
                  </div>

                  {agendamento.observacoes && (
                    <div className="mt-2 text-xs text-theme-tertiary italic truncate">
                      &quot;{agendamento.observacoes}&quot;
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-1 ml-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(agendamento.id)}
                    className="text-xs px-2 py-1"
                  >
                    Detalhes
                  </Button>
                  
                  {getNextActions(agendamento.status).map((action) => (
                    <Button
                      key={action}
                      variant={getActionVariant(action) as any}
                      size="sm"
                      onClick={() => onUpdateStatus(agendamento.id, action as AgendamentoResumo['status'])}
                      className="text-xs px-2 py-1"
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