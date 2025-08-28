'use client'

import { useMemo } from 'react'
import { Clock, User, Scissors, Phone, Calendar } from 'lucide-react'
import { CalendarEvent, AppointmentStatus } from '../../types/appointment'

interface CalendarDayViewProps {
  date: Date
  events: CalendarEvent[]
  selectedAppointments: string[]
  onAppointmentClick: (appointmentId: string) => void
  onStatusUpdate: (appointmentId: string, status: AppointmentStatus) => void
  onReschedule: (appointmentId: string, newDateTime: Date) => void
}

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00'
]

export function CalendarDayView({
  date,
  events,
  selectedAppointments,
  onAppointmentClick,
  onStatusUpdate,
  onReschedule
}: CalendarDayViewProps) {
  // Filtrar eventos do dia
  const dayEvents = useMemo(() => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime)
      return eventDate.toDateString() === date.toDateString()
    }).sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
  }, [events, date])

  const getStatusColor = (status: AppointmentStatus) => {
    const colors = {
      agendado: 'bg-blue-500',
      confirmado: 'bg-green-500',
      em_andamento: 'bg-yellow-500',
      concluido: 'bg-gray-500',
      cancelado: 'bg-red-500',
      nao_compareceu: 'bg-purple-500'
    }
    return colors[status] || colors.agendado
  }

  const getStatusBorder = (status: AppointmentStatus) => {
    const colors = {
      agendado: 'border-blue-500',
      confirmado: 'border-green-500',
      em_andamento: 'border-yellow-500',
      concluido: 'border-gray-500',
      cancelado: 'border-red-500',
      nao_compareceu: 'border-purple-500'
    }
    return colors[status] || colors.agendado
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`
    }
    return `${mins}min`
  }

  return (
    <div className="p-6">
      {/* Header do dia */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          {date.toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        <p className="text-gray-400">
          {dayEvents.length} agendamento(s) para este dia
        </p>
      </div>

      {dayEvents.length === 0 ? (
        /* Estado vazio */
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            Nenhum agendamento para este dia
          </h3>
          <p className="text-gray-500 mb-6">
            Que tal aproveitar para organizar outros aspectos da barbearia?
          </p>
        </div>
      ) : (
        /* Lista de agendamentos */
        <div className="space-y-4">
          {dayEvents.map((event) => {
            const isSelected = selectedAppointments.includes(event.id)
            const endTime = new Date(event.startTime.getTime() + event.duracao * 60000)
            
            return (
              <div
                key={event.id}
                className={`bg-gray-800 rounded-lg border-2 p-4 cursor-pointer transition-all hover:bg-gray-700 ${
                  getStatusBorder(event.status)
                } ${
                  isSelected ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900' : ''
                }`}
                onClick={() => onAppointmentClick(event.id)}
              >
                <div className="flex items-start justify-between">
                  {/* Informações principais */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {/* Status indicator */}
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`} />
                      
                      {/* Horário */}
                      <div className="flex items-center space-x-2 text-white">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">
                          {formatTime(event.startTime)} - {formatTime(endTime)}
                        </span>
                        <span className="text-gray-400 text-sm">
                          ({formatDuration(event.duracao)})
                        </span>
                      </div>
                    </div>

                    {/* Cliente */}
                    <div className="flex items-center space-x-3 mb-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <span className="text-white font-medium">{event.clienteNome}</span>
                        {event.clienteTelefone && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Phone className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-400 text-sm">{event.clienteTelefone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Serviço e Barbeiro */}
                    <div className="flex items-center space-x-3 mb-2">
                      <Scissors className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{event.servicoNome}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">{event.barbeiroNome}</span>
                    </div>

                    {/* Observações */}
                    {event.observacoes && (
                      <div className="mt-2 p-2 bg-gray-700 rounded text-sm text-gray-300">
                        {event.observacoes}
                      </div>
                    )}
                  </div>

                  {/* Valor e Status */}
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-green-400 mb-2">
                      R$ {event.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'agendado' ? 'bg-blue-500/20 text-blue-400' :
                      event.status === 'confirmado' ? 'bg-green-500/20 text-green-400' :
                      event.status === 'em_andamento' ? 'bg-yellow-500/20 text-yellow-400' :
                      event.status === 'concluido' ? 'bg-gray-500/20 text-gray-400' :
                      event.status === 'cancelado' ? 'bg-red-500/20 text-red-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {event.status === 'agendado' ? 'Agendado' :
                       event.status === 'confirmado' ? 'Confirmado' :
                       event.status === 'em_andamento' ? 'Em Andamento' :
                       event.status === 'concluido' ? 'Concluído' :
                       event.status === 'cancelado' ? 'Cancelado' :
                       'Não Compareceu'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Resumo do dia */}
      {dayEvents.length > 0 && (
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="text-lg font-medium text-white mb-4">Resumo do Dia</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {dayEvents.length}
              </div>
              <div className="text-sm text-gray-400">Total de Agendamentos</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                R$ {dayEvents.reduce((total, event) => total + event.valorTotal, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-400">Receita Prevista</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {dayEvents.reduce((total, event) => total + event.duracao, 0)} min
              </div>
              <div className="text-sm text-gray-400">Tempo Total</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}