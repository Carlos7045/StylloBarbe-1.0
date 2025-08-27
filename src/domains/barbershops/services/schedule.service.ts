import { 
  ConfiguracaoHorarios,
  HorarioFuncionamento,
  IntervaloTrabalho,
  BloqueioTemporario,
  ConfiguracaoAgendamento,
  CriarBloqueioData,
  AtualizarBloqueioData
} from '../types/schedule'

// Mock data para desenvolvimento
const mockConfiguracaoHorarios: ConfiguracaoHorarios = {
  id: '1',
  barbeariaId: 'barbearia-1',
  horariosFuncionamento: [
    { id: '1', diaSemana: 1, horaAbertura: '08:00', horaFechamento: '18:00', ativo: true },
    { id: '2', diaSemana: 2, horaAbertura: '08:00', horaFechamento: '18:00', ativo: true },
    { id: '3', diaSemana: 3, horaAbertura: '08:00', horaFechamento: '18:00', ativo: true },
    { id: '4', diaSemana: 4, horaAbertura: '08:00', horaFechamento: '18:00', ativo: true },
    { id: '5', diaSemana: 5, horaAbertura: '08:00', horaFechamento: '18:00', ativo: true },
    { id: '6', diaSemana: 6, horaAbertura: '08:00', horaFechamento: '16:00', ativo: true },
    { id: '7', diaSemana: 0, horaAbertura: '09:00', horaFechamento: '14:00', ativo: false }
  ],
  intervalos: [
    {
      id: '1',
      nome: 'Almoço',
      horaInicio: '12:00',
      horaFim: '13:00',
      diasSemana: [1, 2, 3, 4, 5, 6],
      ativo: true
    },
    {
      id: '2',
      nome: 'Lanche da Tarde',
      horaInicio: '15:30',
      horaFim: '16:00',
      diasSemana: [1, 2, 3, 4, 5],
      ativo: true
    }
  ],
  bloqueios: [
    {
      id: '1',
      titulo: 'Férias de Final de Ano',
      descricao: 'Barbearia fechada para férias coletivas',
      dataInicio: new Date('2024-12-24'),
      dataFim: new Date('2024-01-02'),
      barbeiroIds: [],
      tipo: 'ferias',
      ativo: true,
      criadoEm: new Date('2024-11-01')
    },
    {
      id: '2',
      titulo: 'Manutenção do Sistema',
      descricao: 'Manutenção preventiva dos equipamentos',
      dataInicio: new Date('2024-03-15'),
      dataFim: new Date('2024-03-15'),
      horaInicio: '07:00',
      horaFim: '09:00',
      barbeiroIds: [],
      tipo: 'manutencao',
      ativo: true,
      criadoEm: new Date('2024-03-01')
    }
  ],
  configuracaoAgendamento: {
    antecedenciaMinima: 2, // 2 horas
    antecedenciaMaxima: 30, // 30 dias
    intervaloPadrao: 15, // 15 minutos
    permitirAgendamentoSabado: true,
    permitirAgendamentoDomingo: false,
    permitirAgendamentoFeriado: false,
    cancelamentoAntecedencia: 4, // 4 horas
    reagendamentoAntecedencia: 2 // 2 horas
  },
  atualizadoEm: new Date('2024-01-15')
}

export class ScheduleService {
  static async obterConfiguracaoHorarios(barbeariaId: string): Promise<ConfiguracaoHorarios> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { ...mockConfiguracaoHorarios, barbeariaId }
  }

  static async atualizarHorariosFuncionamento(
    barbeariaId: string,
    horarios: HorarioFuncionamento[]
  ): Promise<ConfiguracaoHorarios> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    mockConfiguracaoHorarios.horariosFuncionamento = horarios
    mockConfiguracaoHorarios.atualizadoEm = new Date()
    
    return { ...mockConfiguracaoHorarios, barbeariaId }
  }

  static async atualizarIntervalos(
    barbeariaId: string,
    intervalos: IntervaloTrabalho[]
  ): Promise<ConfiguracaoHorarios> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    mockConfiguracaoHorarios.intervalos = intervalos
    mockConfiguracaoHorarios.atualizadoEm = new Date()
    
    return { ...mockConfiguracaoHorarios, barbeariaId }
  }

  static async atualizarConfiguracaoAgendamento(
    barbeariaId: string,
    configuracao: ConfiguracaoAgendamento
  ): Promise<ConfiguracaoHorarios> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    mockConfiguracaoHorarios.configuracaoAgendamento = configuracao
    mockConfiguracaoHorarios.atualizadoEm = new Date()
    
    return { ...mockConfiguracaoHorarios, barbeariaId }
  }

  static async criarBloqueio(
    barbeariaId: string,
    data: CriarBloqueioData
  ): Promise<BloqueioTemporario> {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const novoBloqueio: BloqueioTemporario = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      ativo: true,
      criadoEm: new Date()
    }
    
    mockConfiguracaoHorarios.bloqueios.push(novoBloqueio)
    mockConfiguracaoHorarios.atualizadoEm = new Date()
    
    return novoBloqueio
  }

  static async atualizarBloqueio(
    id: string,
    data: AtualizarBloqueioData
  ): Promise<BloqueioTemporario> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const index = mockConfiguracaoHorarios.bloqueios.findIndex(b => b.id === id)
    if (index === -1) {
      throw new Error('Bloqueio não encontrado')
    }
    
    const bloqueioAtualizado = {
      ...mockConfiguracaoHorarios.bloqueios[index],
      ...data
    }
    
    mockConfiguracaoHorarios.bloqueios[index] = bloqueioAtualizado
    mockConfiguracaoHorarios.atualizadoEm = new Date()
    
    return bloqueioAtualizado
  }

  static async excluirBloqueio(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = mockConfiguracaoHorarios.bloqueios.findIndex(b => b.id === id)
    if (index === -1) {
      throw new Error('Bloqueio não encontrado')
    }
    
    mockConfiguracaoHorarios.bloqueios.splice(index, 1)
    mockConfiguracaoHorarios.atualizadoEm = new Date()
  }

  static async listarBarbeiros(barbeariaId: string): Promise<{ id: string; nome: string }[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    // Mock de barbeiros - em uma implementação real viria da API de funcionários
    return [
      { id: '1', nome: 'João Silva' },
      { id: '2', nome: 'Pedro Santos' },
      { id: '3', nome: 'Carlos Oliveira' }
    ]
  }

  static async verificarDisponibilidade(
    barbeariaId: string,
    data: Date,
    horaInicio: string,
    horaFim: string,
    barbeiroId?: string
  ): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Simula verificação de disponibilidade
    // Em uma implementação real, verificaria conflitos com agendamentos existentes
    const diaSemana = data.getDay()
    const horarioFuncionamento = mockConfiguracaoHorarios.horariosFuncionamento
      .find(h => h.diaSemana === diaSemana && h.ativo)
    
    if (!horarioFuncionamento) return false
    
    // Verifica se está dentro do horário de funcionamento
    if (horaInicio < horarioFuncionamento.horaAbertura || horaFim > horarioFuncionamento.horaFechamento) {
      return false
    }
    
    // Verifica bloqueios
    const bloqueiosAtivos = mockConfiguracaoHorarios.bloqueios.filter(b => b.ativo)
    for (const bloqueio of bloqueiosAtivos) {
      if (data >= bloqueio.dataInicio && data <= bloqueio.dataFim) {
        // Se tem horário específico, verifica conflito
        if (bloqueio.horaInicio && bloqueio.horaFim) {
          if (!(horaFim <= bloqueio.horaInicio || horaInicio >= bloqueio.horaFim)) {
            return false
          }
        } else {
          // Bloqueio do dia todo
          return false
        }
      }
    }
    
    return true
  }
}