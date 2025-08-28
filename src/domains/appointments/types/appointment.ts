export interface Appointment {
  id: string
  clienteId: string
  clienteNome: string
  clienteTelefone: string
  clienteEmail?: string
  barbeiroId: string
  barbeiroNome: string
  servicoId: string
  servicoNome: string
  barbeariaId: string
  dataHora: Date
  duracao: number // em minutos
  valorTotal: number
  status: AppointmentStatus
  observacoes?: string
  criadoEm: Date
  atualizadoEm: Date
}

export type AppointmentStatus = 
  | 'agendado' 
  | 'confirmado' 
  | 'em_andamento' 
  | 'concluido' 
  | 'cancelado' 
  | 'nao_compareceu'

export interface AppointmentFilters {
  barbeiro?: string
  servico?: string
  status?: AppointmentStatus
  dataInicio?: Date
  dataFim?: Date
  busca?: string
}

export type CalendarView = 'day' | 'week' | 'month'

export interface CalendarEvent extends Appointment {
  startTime: Date
  endTime: Date
  color: string
}

export interface TimeSlot {
  time: string
  available: boolean
  appointment?: Appointment
}

export interface DaySchedule {
  date: Date
  slots: TimeSlot[]
  appointments: Appointment[]
}