import { useState, useEffect, useMemo } from 'react'
import { 
  Appointment, 
  AppointmentFilters, 
  CalendarView, 
  CalendarEvent,
  AppointmentStatus 
} from '../types/appointment'
import { AppointmentsService } from '../services/appointments.service'

export function useAppointmentCalendar(barbeariaId: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<CalendarView>('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [filters, setFilters] = useState<AppointmentFilters>({})
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>([])

  // Carregar agendamentos
  const loadAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await AppointmentsService.getAppointments(barbeariaId, filters)
      setAppointments(data)
    } catch (err) {
      setError('Erro ao carregar agendamentos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Converter appointments para eventos do calendário
  const calendarEvents = useMemo<CalendarEvent[]>(() => {
    return appointments.map(appointment => ({
      ...appointment,
      startTime: appointment.dataHora,
      endTime: new Date(appointment.dataHora.getTime() + appointment.duracao * 60000),
      color: getStatusColor(appointment.status)
    }))
  }, [appointments])

  // Filtrar eventos por data baseado na visualização atual
  const visibleEvents = useMemo(() => {
    const start = getViewStartDate(currentDate, view)
    const end = getViewEndDate(currentDate, view)
    
    return calendarEvents.filter(event => 
      event.startTime >= start && event.startTime <= end
    )
  }, [calendarEvents, currentDate, view])

  // Navegação do calendário
  const navigateCalendar = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    
    switch (view) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
        break
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
        break
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
        break
    }
    
    setCurrentDate(newDate)
  }

  // Ir para hoje
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Aplicar filtros
  const applyFilters = (newFilters: AppointmentFilters) => {
    setFilters(newFilters)
  }

  // Limpar filtros
  const clearFilters = () => {
    setFilters({})
  }

  // Atualizar status do agendamento
  const updateAppointmentStatus = async (appointmentId: string, status: AppointmentStatus) => {
    try {
      await AppointmentsService.updateAppointmentStatus(appointmentId, status)
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status } : apt
        )
      )
    } catch (err) {
      setError('Erro ao atualizar status do agendamento')
      throw err
    }
  }

  // Reagendar agendamento (drag and drop)
  const rescheduleAppointment = async (appointmentId: string, newDateTime: Date) => {
    try {
      await AppointmentsService.rescheduleAppointment(appointmentId, newDateTime)
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, dataHora: newDateTime } : apt
        )
      )
    } catch (err) {
      setError('Erro ao reagendar agendamento')
      throw err
    }
  }

  // Seleção múltipla
  const toggleAppointmentSelection = (appointmentId: string) => {
    setSelectedAppointments(prev => 
      prev.includes(appointmentId)
        ? prev.filter(id => id !== appointmentId)
        : [...prev, appointmentId]
    )
  }

  const selectAllAppointments = () => {
    setSelectedAppointments(visibleEvents.map(event => event.id))
  }

  const clearSelection = () => {
    setSelectedAppointments([])
  }

  // Operações em lote
  const batchUpdateStatus = async (appointmentIds: string[], status: AppointmentStatus) => {
    try {
      await AppointmentsService.batchUpdateStatus(appointmentIds, status)
      setAppointments(prev => 
        prev.map(apt => 
          appointmentIds.includes(apt.id) ? { ...apt, status } : apt
        )
      )
      clearSelection()
    } catch (err) {
      setError('Erro ao atualizar agendamentos em lote')
      throw err
    }
  }

  // Efeitos
  useEffect(() => {
    loadAppointments()
  }, [barbeariaId, filters])

  return {
    // Estado
    appointments,
    calendarEvents,
    visibleEvents,
    loading,
    error,
    view,
    currentDate,
    filters,
    selectedAppointments,
    
    // Ações
    setView,
    navigateCalendar,
    goToToday,
    applyFilters,
    clearFilters,
    updateAppointmentStatus,
    rescheduleAppointment,
    toggleAppointmentSelection,
    selectAllAppointments,
    clearSelection,
    batchUpdateStatus,
    reload: loadAppointments
  }
}

// Funções auxiliares
function getStatusColor(status: AppointmentStatus): string {
  const colors = {
    agendado: '#3B82F6',      // blue
    confirmado: '#10B981',    // green
    em_andamento: '#F59E0B',  // yellow
    concluido: '#6B7280',     // gray
    cancelado: '#EF4444',     // red
    nao_compareceu: '#8B5CF6' // purple
  }
  return colors[status] || colors.agendado
}

function getViewStartDate(date: Date, view: CalendarView): Date {
  const start = new Date(date)
  
  switch (view) {
    case 'day':
      start.setHours(0, 0, 0, 0)
      break
    case 'week':
      const dayOfWeek = start.getDay()
      start.setDate(start.getDate() - dayOfWeek)
      start.setHours(0, 0, 0, 0)
      break
    case 'month':
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      break
  }
  
  return start
}

function getViewEndDate(date: Date, view: CalendarView): Date {
  const end = new Date(date)
  
  switch (view) {
    case 'day':
      end.setHours(23, 59, 59, 999)
      break
    case 'week':
      const dayOfWeek = end.getDay()
      end.setDate(end.getDate() + (6 - dayOfWeek))
      end.setHours(23, 59, 59, 999)
      break
    case 'month':
      end.setMonth(end.getMonth() + 1, 0)
      end.setHours(23, 59, 59, 999)
      break
  }
  
  return end
}