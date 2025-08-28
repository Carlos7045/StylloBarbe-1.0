'use client'

import { useState } from 'react'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Search,
  Grid3X3,
  List,
  Plus
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { useAppointmentCalendar } from '../../hooks/useAppointmentCalendar'
import { CalendarFilters } from './CalendarFilters'
import { CalendarDayView } from './CalendarDayView'
import { CalendarWeekView } from './CalendarWeekView'
import { CalendarMonthView } from './CalendarMonthView'
import { CalendarStats } from './CalendarStats'
import { BatchOperationsPanel } from './BatchOperationsPanel'
import { CalendarView } from '../../types/appointment'

interface AppointmentCalendarProps {
  barbeariaId: string
}

export function AppointmentCalendar({ barbeariaId }: AppointmentCalendarProps) {
  const {
    appointments,
    visibleEvents,
    loading,
    error,
    view,
    currentDate,
    filters,
    selectedAppointments,
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
    batchUpdateStatus
  } = useAppointmentCalendar(barbeariaId)

  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Aplicar busca
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters({ ...filters, busca: term })
  }

  // Formatar título da data atual
  const getDateTitle = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    }
    
    switch (view) {
      case 'day':
        return currentDate.toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      case 'week':
        const weekStart = new Date(currentDate)
        weekStart.setDate(currentDate.getDate() - currentDate.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        
        return `${weekStart.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${weekEnd.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}`
      case 'month':
        return currentDate.toLocaleDateString('pt-BR', options)
      default:
        return ''
    }
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
        >
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header com controles */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Navegação e título */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateCalendar('prev')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 px-4"
              >
                Hoje
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateCalendar('next')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-white">
                {getDateTitle()}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {visibleEvents.length} agendamento(s) encontrado(s)
              </p>
            </div>
          </div>

          {/* Controles de visualização e ações */}
          <div className="flex items-center space-x-3">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar agendamentos..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64 bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {/* Filtros */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>

            {/* Seletor de visualização */}
            <div className="flex bg-gray-700 rounded-lg p-1">
              <Button
                variant={view === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('day')}
                className={view === 'day' ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-600'}
              >
                Dia
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('week')}
                className={view === 'week' ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-600'}
              >
                Semana
              </Button>
              <Button
                variant={view === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('month')}
                className={view === 'month' ? 'bg-yellow-500 text-gray-900' : 'text-gray-300 hover:bg-gray-600'}
              >
                Mês
              </Button>
            </div>

            {/* Novo agendamento */}
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Novo
            </Button>
          </div>
        </div>

        {/* Filtros expandidos */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <CalendarFilters
              filters={filters}
              onFiltersChange={applyFilters}
              onClearFilters={clearFilters}
            />
          </div>
        )}
      </div>

      {/* Estatísticas rápidas */}
      <CalendarStats appointments={appointments} />

      {/* Operações em lote */}
      {selectedAppointments.length > 0 && (
        <BatchOperationsPanel
          selectedCount={selectedAppointments.length}
          onBatchUpdate={batchUpdateStatus}
          onSelectAll={selectAllAppointments}
          onClearSelection={clearSelection}
        />
      )}

      {/* Visualização do calendário */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-700 border-t-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando agendamentos...</p>
          </div>
        ) : (
          <>
            {view === 'day' && (
              <CalendarDayView
                date={currentDate}
                events={visibleEvents}
                selectedAppointments={selectedAppointments}
                onAppointmentClick={toggleAppointmentSelection}
                onStatusUpdate={updateAppointmentStatus}
                onReschedule={rescheduleAppointment}
              />
            )}
            
            {view === 'week' && (
              <CalendarWeekView
                date={currentDate}
                events={visibleEvents}
                selectedAppointments={selectedAppointments}
                onAppointmentClick={toggleAppointmentSelection}
                onStatusUpdate={updateAppointmentStatus}
                onReschedule={rescheduleAppointment}
              />
            )}
            
            {view === 'month' && (
              <CalendarMonthView
                date={currentDate}
                events={visibleEvents}
                selectedAppointments={selectedAppointments}
                onAppointmentClick={toggleAppointmentSelection}
                onStatusUpdate={updateAppointmentStatus}
                onReschedule={rescheduleAppointment}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}