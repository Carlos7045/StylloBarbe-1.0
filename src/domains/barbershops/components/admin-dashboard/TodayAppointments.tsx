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
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-white">
            Agendamentos de Hoje
          </h2>
          
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
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

      <div className="divide-y divide-gray-700">
        {agendamentosFiltrados.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-500" />
            <p>Nenhum agendamento encontrado para hoje</p>
          </div>
        ) : (
          agendamentosFiltrados.map((agendamento) => (
            <div key={agendamento.id} className="p-6 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(agendamento.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(agendamento.status)}`}>
                        {getStatusText(agendamento.status)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-white">
                      {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-white">
                          {agendamento.clienteNome}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {agendamento.clienteTelefone}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Scissors className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-white">
                          {agendamento.servicoNome}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {agendamento.barbeiroNome}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-lg font-semibold text-green-400">
                      R$ {agendamento.valorTotal.toLocaleString()}
                    </div>
                    
                    {agendamento.observacoes && (
                      <div className="text-sm text-gray-400 italic max-w-xs truncate">
                        "{agendamento.observacoes}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(agendamento.id)}
                  >
                    Detalhes
                  </Button>
                  
                  {getNextActions(agendamento.status).map((action) => (
                    <Button
                      key={action}
                      variant={getActionVariant(action) as any}
                      size="sm"
                      onClick={() => onUpdateStatus(agendamento.id, action as AgendamentoResumo['status'])}
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