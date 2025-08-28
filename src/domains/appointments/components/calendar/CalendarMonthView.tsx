'use client'

import { useMemo } from 'react'
import { CalendarEvent, AppointmentStatus } from '../../types/appointment'

interface CalendarMonthViewProps {
  date: Date
  events: CalendarEvent[]
  selectedAppointments: string[]
  onAppointmentClick: (appointmentId: string) => void
  onStatusUpdate: (appointmentId: string, status: AppointmentStatus) => void
  onReschedule: (appointmentId: string, newDateTime: Date) => void
}

export function CalendarMonthView({
  date,
  events,
  selectedAppointments,
  onAppointmentClick,
  onStatusUpdate,
  onReschedule
}: CalendarMonthViewProps) {
  // Calcular os dias do mês
  const monthDays = useMemo(() => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1)
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0)
    
    // Primeiro dia da semana (domingo = 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    // Último dia da semana
    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()))
    
    const days = []
    const current = new Date(startDate)
    
    while (current <= endDate) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }, [date])

  // Organizar eventos por dia
  const eventsByDay = useMemo(() => {
    const organized: { [key: string]: CalendarEvent[] } = {}
    
    events.forEach(event => {
      const eventDate = new Date(event.startTime)
      const dayKey = eventDate.toDateString()
      
      if (!organized[dayKey]) {
        organized[dayKey] = []
      }
      organized[dayKey].push(event)
    })
    
    return organized
  }, [events])

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

  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === date.getMonth()
  }

  const isToday = (day: Date) => {
    const today = new Date()
    return day.toDateString() === today.toDateString()
  }

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  return (
    <div className="p-6">
      {/* Header dos dias da semana */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Grid do calendário */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((day, index) => {
          const dayEvents = eventsByDay[day.toDateString()] || []
          const isCurrentMonthDay = isCurrentMonth(day)
          const isTodayDay = isToday(day)
          
          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border border-gray-700 rounded ${
                isCurrentMonthDay 
                  ? (isTodayDay ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-gray-800') 
                  : 'bg-gray-900/50'
              }`}
            >
              {/* Número do dia */}
              <div className={`text-sm font-medium mb-2 ${
                isCurrentMonthDay 
                  ? (isTodayDay ? 'text-yellow-400' : 'text-white')
                  : 'text-gray-600'
              }`}>
                {day.getDate()}
              </div>

              {/* Eventos do dia */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => {
                  const isSelected = selectedAppointments.includes(event.id)
                  
                  return (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded cursor-pointer transition-all hover:opacity-80 ${
                        getStatusColor(event.status)
                      } ${
                        isSelected ? 'ring-1 ring-yellow-400' : ''
                      }`}
                      onClick={() => onAppointmentClick(event.id)}
                      title={`${event.startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${event.clienteNome} - ${event.servicoNome}`}
                    >
                      <div className="text-white font-medium truncate">
                        {event.startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-white/90 truncate">
                        {event.clienteNome}
                      </div>
                    </div>
                  )
                })}

                {/* Indicador de mais eventos */}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-400 text-center py-1">
                    +{dayEvents.length - 3} mais
                  </div>
                )}
              </div>

              {/* Indicador de quantidade */}
              {dayEvents.length > 0 && (
                <div className="mt-2 text-center">
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-gray-600 rounded-full">
                    {dayEvents.length}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legenda */}
      <div className="mt-6 p-4 bg-gray-800 rounded border border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm text-gray-400">Status:</span>
          
          {Object.entries({
            agendado: 'Agendado',
            confirmado: 'Confirmado', 
            em_andamento: 'Em Andamento',
            concluido: 'Concluído',
            cancelado: 'Cancelado'
          }).map(([status, label]) => (
            <div key={status} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded ${getStatusColor(status as AppointmentStatus)}`} />
              <span className="text-xs text-gray-300">{label}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          Clique nos agendamentos para selecioná-los. Use Ctrl+Click para seleção múltipla.
        </div>
      </div>

      {/* Resumo do mês */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded p-4 text-center border border-gray-700">
          <div className="text-xl font-bold text-blue-400">
            {events.length}
          </div>
          <div className="text-sm text-gray-400">Total de Agendamentos</div>
        </div>
        
        <div className="bg-gray-800 rounded p-4 text-center border border-gray-700">
          <div className="text-xl font-bold text-green-400">
            {events.filter(e => ['confirmado', 'em_andamento', 'concluido'].includes(e.status)).length}
          </div>
          <div className="text-sm text-gray-400">Confirmados</div>
        </div>
        
        <div className="bg-gray-800 rounded p-4 text-center border border-gray-700">
          <div className="text-xl font-bold text-yellow-400">
            R$ {events.reduce((total, event) => total + event.valorTotal, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-gray-400">Receita Total</div>
        </div>
        
        <div className="bg-gray-800 rounded p-4 text-center border border-gray-700">
          <div className="text-xl font-bold text-purple-400">
            {events.filter(e => e.status === 'cancelado').length}
          </div>
          <div className="text-sm text-gray-400">Cancelados</div>
        </div>
      </div>
    </div>
  )
}