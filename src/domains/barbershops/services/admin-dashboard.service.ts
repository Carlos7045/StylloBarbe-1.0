// Serviços para o dashboard do Admin Barbearia

import { 
  MetricasBarbearia, 
  AgendamentoResumo, 
  BarbeiroResumo, 
  AlertaBarbearia,
  PerformanceBarbearia 
} from '../types/admin-dashboard'

export class AdminBarbeariaService {
  static async getMetricasBarbearia(barbeariaId: string): Promise<MetricasBarbearia> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      agendamentosHoje: 12,
      receitaHoje: 850,
      receitaMes: 18500,
      clientesAtendidos: 8,
      proximosAgendamentos: 4,
      barbeirosAtivos: 3,
      taxaOcupacao: 75,
      avaliacaoMedia: 4.8
    }
  }

  static async getAgendamentosHoje(barbeariaId: string): Promise<AgendamentoResumo[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return [
      {
        id: '1',
        clienteNome: 'João Silva',
        clienteTelefone: '(11) 99999-9999',
        barbeiroNome: 'Carlos Barbeiro',
        servicoNome: 'Corte + Barba',
        dataHora: new Date('2024-01-15T09:00:00'),
        status: 'confirmado',
        valorTotal: 45,
        observacoes: 'Cliente prefere corte baixo nas laterais'
      },
      {
        id: '2',
        clienteNome: 'Pedro Santos',
        clienteTelefone: '(11) 88888-8888',
        barbeiroNome: 'Roberto Silva',
        servicoNome: 'Corte Masculino',
        dataHora: new Date('2024-01-15T10:30:00'),
        status: 'em_andamento',
        valorTotal: 30
      },
      {
        id: '3',
        clienteNome: 'Lucas Oliveira',
        clienteTelefone: '(11) 77777-7777',
        barbeiroNome: 'Carlos Barbeiro',
        servicoNome: 'Barba + Bigode',
        dataHora: new Date('2024-01-15T11:00:00'),
        status: 'agendado',
        valorTotal: 25,
        observacoes: 'Primeira vez na barbearia'
      },
      {
        id: '4',
        clienteNome: 'André Costa',
        clienteTelefone: '(11) 66666-6666',
        barbeiroNome: 'Miguel Ferreira',
        servicoNome: 'Corte + Barba + Sobrancelha',
        dataHora: new Date('2024-01-15T14:00:00'),
        status: 'agendado',
        valorTotal: 55
      },
      {
        id: '5',
        clienteNome: 'Rafael Lima',
        clienteTelefone: '(11) 55555-5555',
        barbeiroNome: 'Roberto Silva',
        servicoNome: 'Corte Degradê',
        dataHora: new Date('2024-01-15T15:30:00'),
        status: 'concluido',
        valorTotal: 35
      }
    ]
  }

  static async getBarbeiros(barbeariaId: string): Promise<BarbeiroResumo[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return [
      {
        id: '1',
        nome: 'Carlos Barbeiro',
        avatar: undefined,
        especialidades: ['Corte Clássico', 'Barba', 'Degradê'],
        agendamentosHoje: 5,
        receitaHoje: 225,
        proximoAgendamento: new Date('2024-01-15T16:00:00'),
        status: 'ocupado'
      },
      {
        id: '2',
        nome: 'Roberto Silva',
        avatar: undefined,
        especialidades: ['Corte Moderno', 'Sobrancelha', 'Relaxamento'],
        agendamentosHoje: 4,
        receitaHoje: 180,
        proximoAgendamento: new Date('2024-01-15T17:30:00'),
        status: 'disponivel'
      },
      {
        id: '3',
        nome: 'Miguel Ferreira',
        avatar: undefined,
        especialidades: ['Barba', 'Bigode', 'Tratamentos'],
        agendamentosHoje: 3,
        receitaHoje: 165,
        proximoAgendamento: new Date('2024-01-15T18:00:00'),
        status: 'disponivel'
      }
    ]
  }

  static async getAlertas(barbeariaId: string): Promise<AlertaBarbearia[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return [
      {
        id: '1',
        tipo: 'agendamento_proximo',
        titulo: 'Próximo agendamento em 15 minutos',
        descricao: 'João Silva - Corte + Barba com Carlos às 16:00',
        agendamentoId: '1',
        prioridade: 'alta',
        criadoEm: new Date()
      },
      {
        id: '2',
        tipo: 'cliente_aguardando',
        titulo: 'Cliente aguardando',
        descricao: 'Pedro Santos chegou para o agendamento das 15:30',
        agendamentoId: '2',
        prioridade: 'media',
        criadoEm: new Date()
      },
      {
        id: '3',
        tipo: 'pagamento_pendente',
        titulo: 'Pagamento pendente',
        descricao: 'Serviço de Rafael Lima ainda não foi pago',
        agendamentoId: '5',
        prioridade: 'baixa',
        criadoEm: new Date()
      }
    ]
  }

  static async getPerformance(barbeariaId: string): Promise<PerformanceBarbearia[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 700))
    
    return [
      { periodo: 'Seg', agendamentos: 15, receita: 675, clientesNovos: 3, avaliacaoMedia: 4.7 },
      { periodo: 'Ter', agendamentos: 18, receita: 810, clientesNovos: 5, avaliacaoMedia: 4.8 },
      { periodo: 'Qua', agendamentos: 12, receita: 540, clientesNovos: 2, avaliacaoMedia: 4.6 },
      { periodo: 'Qui', agendamentos: 20, receita: 900, clientesNovos: 4, avaliacaoMedia: 4.9 },
      { periodo: 'Sex', agendamentos: 22, receita: 990, clientesNovos: 6, avaliacaoMedia: 4.8 },
      { periodo: 'Sáb', agendamentos: 25, receita: 1125, clientesNovos: 8, avaliacaoMedia: 4.9 },
      { periodo: 'Dom', agendamentos: 8, receita: 360, clientesNovos: 1, avaliacaoMedia: 4.5 }
    ]
  }

  static async updateAgendamentoStatus(
    agendamentoId: string, 
    status: AgendamentoResumo['status']
  ): Promise<void> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log(`Agendamento ${agendamentoId} atualizado para ${status}`)
  }

  static async getAgendamentoDetails(agendamentoId: string): Promise<AgendamentoResumo | null> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const agendamentos = await this.getAgendamentosHoje('mock-barbearia-id')
    return agendamentos.find(a => a.id === agendamentoId) || null
  }
}