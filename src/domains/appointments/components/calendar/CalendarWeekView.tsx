'use client'

import { useMemo } from 'react'
import { Clock, User, Scissors } from 'lucide-react'
import { CalendarEvent, AppointmentStatus } from '../../types/appointment'

interface CalendarWeekViewProps {
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

export function CalendarWeekView({
  date,
  events,
  selectedAppointments,
  onAppointmentClick,
  onStatusUpdate,
  onReschedule
}: CalendarWeekViewProps) {
  // Calcular os dias da semana
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay()) // Domingo
    
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      return day
    })
  }, [date])

  // Organizar eventos por dia
  const eventsByDay = useMemo(() => {
    const organized: { [key: string]: CalendarEvent[] } = {}
    
    weekDays.forEach(day => {
      const dayKey = day.toDateString()
      organized[dayKey] = events.filter(event => {
        const eventDate = new Date(event.startTime)
        return eventDate.toDateString() === dayKey
      })
    })
    
    return organized
  }, [weekDays, events])

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

  const getStatusText = (status: AppointmentStatus) => {
    const texts = {
      agendado: 'Agendado',
      confirmado: 'Confirmado',
      em_andamento: 'Em Andamento',
      concluido: 'Concluído',
      cancelado: 'Cancelado',
      nao_compareceu: 'Não Compareceu'
    }
    return texts[status] || texts.agendado
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header com os dias da semana */}
        <div className="grid grid-cols-8 border-b border-gray-700">
          {/* Coluna de horários */}
          <div className="p-4 bg-gray-800 border-r border-gray-700">
            <div className="text-sm font-medium text-gray-400">Horário</div>
          </div>
          
          {/* Colunas dos dias */}
          {weekDays.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString()
            const dayEvents = eventsByDay[day.toDateString()] || []
            
            return (
              <div 
                key={index} 
                className={`p-4 text-center border-r border-gray-700 ${
                  isToday ? 'bg-yellow-500/10' : 'bg-gray-800'
                }`}
              >
                <div className={`text-sm font-medium ${
                  isToday ? 'text-yellow-400' : 'text-white'
                }`}>
                  {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${
                  isToday ? 'text-yellow-400' : 'text-gray-300'
                }`}>
                  {day.getDate()}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {dayEvents.length} agend.
                </div>
              </div>
            )
          })}
        </div>

        {/* Grid de horários */}
        <div className="grid grid-cols-8">
          {/* Coluna de horários */}
          <div className="bg-gray-800 border-r border-gray-700">
            {timeSlots.map((time, index) => (
              <div 
                key={time}
                className={`p-2 text-xs text-gray-400 text-right border-b border-gray-700 h-16 flex items-center justify-end ${
                  index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'
                }`}
              >
                {time}
              </div>
            ))}
          </div>

          {/* Colunas dos dias */}
          {weekDays.map((day, dayIndex) => {
            const isToday = day.toDateString() === new Date().toDateString()
            const dayEvents = eventsByDay[day.toDateString()] || []
            
            return (
              <div key={dayIndex} className="border-r border-gray-700 relative">
                {/* Slots de horário */}
                {timeSlots.map((time, timeIndex) => (
                  <div 
                    key={time}
                    className={`border-b border-gray-700 h-16 ${
                      timeIndex % 2 === 0 
                        ? (isToday ? 'bg-yellow-500/5' : 'bg-gray-900') 
                        : (isToday ? 'bg-yellow-500/3' : 'bg-gray-900/50')
                    }`}
                  />
                ))}

                {/* Eventos do dia */}
                <div className="absolute inset-0 p-1">
                  {dayEvents.map((event) => {
                    const startHour = event.startTime.getHours()
                    const startMinute = event.startTime.getMinutes()
                    const duration = event.duracao
                    
                    // Calcular posição vertical baseada no horário
                    const startSlotIndex = timeSlots.findIndex(slot => {
                      const [hour, minute] = slot.split(':').map(Number)
                      return hour === startHour && minute === startMinute
                    })
                    
                    if (startSlotIndex === -1) return null
                    
                    const top = startSlotIndex * 64 // 64px por slot (h-16)
                    const height = Math.max((duration / 30) * 32, 32) // Mínimo 32px
                    
                    const isSelected = selectedAppointments.includes(event.id)
                    
                    return (
                      <div
                        key={event.id}
                        className={`absolute left-1 right-1 rounded p-1 cursor-pointer transition-all hover:shadow-lg ${
                          getStatusColor(event.status)
                        } ${
                          isSelected ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900' : ''
                        }`}
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          zIndex: isSelected ? 10 : 1
                        }}
                        onClick={() => onAppointmentClick(event.id)}
                      >
                        <div className="text-xs text-white font-medium truncate">
                          {event.clienteNome}
                        </div>
                        <div className="text-xs text-white/80 truncate">
                          {formatTime(event.startTime)}
                        </div>
                        <div className="text-xs text-white/60 truncate">
                          {event.servicoNome}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-700">
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
      </div>
    </div>
  )
}