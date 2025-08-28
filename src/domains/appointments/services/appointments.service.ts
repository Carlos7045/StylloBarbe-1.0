import { 
  Appointment, 
  AppointmentFilters, 
  AppointmentStatus 
} from '../types/appointment'

// Mock data para desenvolvimento
const mockAppointments: Appointment[] = [
  {
    id: '1',
    clienteId: 'client-1',
    clienteNome: 'João Silva',
    clienteTelefone: '(11) 99999-9999',
    clienteEmail: 'joao@email.com',
    barbeiroId: 'barber-1',
    barbeiroNome: 'Carlos Barbeiro',
    servicoId: 'service-1',
    servicoNome: 'Corte + Barba',
    barbeariaId: 'barbearia-1',
    dataHora: new Date(2024, 11, 27, 9, 0), // Hoje 9:00
    duracao: 60,
    valorTotal: 45.00,
    status: 'confirmado',
    observacoes: 'Cliente prefere corte baixo',
    criadoEm: new Date(),
    atualizadoEm: new Date()
  },
  {
    id: '2',
    clienteId: 'client-2',
    clienteNome: 'Pedro Santos',
    clienteTelefone: '(11) 88888-8888',
    barbeiroId: 'barber-2',
    barbeiroNome: 'Roberto Barbeiro',
    servicoId: 'service-2',
    servicoNome: 'Corte Simples',
    barbeariaId: 'barbearia-1',
    dataHora: new Date(2024, 11, 27, 10, 30), // Hoje 10:30
    duracao: 30,
    valorTotal: 25.00,
    status: 'agendado',
    criadoEm: new Date(),
    atualizadoEm: new Date()
  },
  {
    id: '3',
    clienteId: 'client-3',
    clienteNome: 'Maria Oliveira',
    clienteTelefone: '(11) 77777-7777',
    barbeiroId: 'barber-1',
    barbeiroNome: 'Carlos Barbeiro',
    servicoId: 'service-3',
    servicoNome: 'Barba',
    barbeariaId: 'barbearia-1',
    dataHora: new Date(2024, 11, 27, 14, 0), // Hoje 14:00
    duracao: 30,
    valorTotal: 20.00,
    status: 'em_andamento',
    criadoEm: new Date(),
    atualizadoEm: new Date()
  },
  {
    id: '4',
    clienteId: 'client-4',
    clienteNome: 'Ana Costa',
    clienteTelefone: '(11) 66666-6666',
    barbeiroId: 'barber-2',
    barbeiroNome: 'Roberto Barbeiro',
    servicoId: 'service-1',
    servicoNome: 'Corte + Barba',
    barbeariaId: 'barbearia-1',
    dataHora: new Date(2024, 11, 28, 11, 0), // Amanhã 11:00
    duracao: 60,
    valorTotal: 45.00,
    status: 'agendado',
    criadoEm: new Date(),
    atualizadoEm: new Date()
  },
  {
    id: '5',
    clienteId: 'client-5',
    clienteNome: 'Lucas Ferreira',
    clienteTelefone: '(11) 55555-5555',
    barbeiroId: 'barber-1',
    barbeiroNome: 'Carlos Barbeiro',
    servicoId: 'service-2',
    servicoNome: 'Corte Simples',
    barbeariaId: 'barbearia-1',
    dataHora: new Date(2024, 11, 26, 16, 0), // Ontem 16:00
    duracao: 30,
    valorTotal: 25.00,
    status: 'concluido',
    criadoEm: new Date(),
    atualizadoEm: new Date()
  }
]

export class AppointmentsService {
  static async getAppointments(
    barbeariaId: string, 
    filters?: AppointmentFilters
  ): Promise<Appointment[]> {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let appointments = mockAppointments.filter(apt => apt.barbeariaId === barbeariaId)
    
    if (filters) {
      if (filters.barbeiro) {
        appointments = appointments.filter(apt => apt.barbeiroId === filters.barbeiro)
      }
      if (filters.servico) {
        appointments = appointments.filter(apt => apt.servicoId === filters.servico)
      }
      if (filters.status) {
        appointments = appointments.filter(apt => apt.status === filters.status)
      }
      if (filters.dataInicio) {
        appointments = appointments.filter(apt => apt.dataHora >= filters.dataInicio!)
      }
      if (filters.dataFim) {
        appointments = appointments.filter(apt => apt.dataHora <= filters.dataFim!)
      }
      if (filters.busca) {
        const busca = filters.busca.toLowerCase()
        appointments = appointments.filter(apt => 
          apt.clienteNome.toLowerCase().includes(busca) ||
          apt.barbeiroNome.toLowerCase().includes(busca) ||
          apt.servicoNome.toLowerCase().includes(busca) ||
          apt.clienteTelefone.includes(busca)
        )
      }
    }
    
    return appointments.sort((a, b) => a.dataHora.getTime() - b.dataHora.getTime())
  }

  static async getAppointment(id: string): Promise<Appointment | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockAppointments.find(apt => apt.id === id) || null
  }

  static async updateAppointmentStatus(
    id: string, 
    status: AppointmentStatus
  ): Promise<Appointment> {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const index = mockAppointments.findIndex(apt => apt.id === id)
    if (index === -1) {
      throw new Error('Agendamento não encontrado')
    }
    
    mockAppointments[index] = {
      ...mockAppointments[index],
      status,
      atualizadoEm: new Date()
    }
    
    return mockAppointments[index]
  }

  static async rescheduleAppointment(
    id: string, 
    newDateTime: Date
  ): Promise<Appointment> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const index = mockAppointments.findIndex(apt => apt.id === id)
    if (index === -1) {
      throw new Error('Agendamento não encontrado')
    }
    
    mockAppointments[index] = {
      ...mockAppointments[index],
      dataHora: newDateTime,
      atualizadoEm: new Date()
    }
    
    return mockAppointments[index]
  }

  static async batchUpdateStatus(
    appointmentIds: string[], 
    status: AppointmentStatus
  ): Promise<Appointment[]> {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const updatedAppointments: Appointment[] = []
    
    appointmentIds.forEach(id => {
      const index = mockAppointments.findIndex(apt => apt.id === id)
      if (index !== -1) {
        mockAppointments[index] = {
          ...mockAppointments[index],
          status,
          atualizadoEm: new Date()
        }
        updatedAppointments.push(mockAppointments[index])
      }
    })
    
    return updatedAppointments
  }

  static async cancelAppointment(id: string, reason?: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = mockAppointments.findIndex(apt => apt.id === id)
    if (index === -1) {
      throw new Error('Agendamento não encontrado')
    }
    
    mockAppointments[index] = {
      ...mockAppointments[index],
      status: 'cancelado',
      observacoes: reason ? `${mockAppointments[index].observacoes || ''}\nCancelado: ${reason}` : mockAppointments[index].observacoes,
      atualizadoEm: new Date()
    }
  }

  static async deleteAppointment(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = mockAppointments.findIndex(apt => apt.id === id)
    if (index === -1) {
      throw new Error('Agendamento não encontrado')
    }
    
    mockAppointments.splice(index, 1)
  }
}