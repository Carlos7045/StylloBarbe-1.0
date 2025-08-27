// Serviços para o dashboard do Barbeiro

import { 
  MetricasBarbeiro, 
  AgendamentoBarbeiro, 
  HistoricoCliente, 
  NotificacaoBarbeiro,
  PerformanceBarbeiro 
} from '../types/barbeiro-dashboard'

export class BarbeiroDashboardService {
  static async getMetricasBarbeiro(barbeiroId: string): Promise<MetricasBarbeiro> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      agendamentosHoje: 8,
      agendamentosSemana: 32,
      receitaHoje: 320,
      receitaSemana: 1280,
      receitaMes: 5200,
      clientesAtendidos: 6,
      proximoAgendamento: new Date('2024-01-15T16:30:00'),
      avaliacaoMedia: 4.9,
      totalAvaliacoes: 127
    }
  }

  static async getAgendamentosBarbeiro(barbeiroId: string): Promise<AgendamentoBarbeiro[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return [
      {
        id: '1',
        clienteNome: 'João Silva',
        clienteTelefone: '(11) 99999-9999',
        servicoNome: 'Corte + Barba',
        dataHora: new Date('2024-01-15T09:00:00'),
        status: 'concluido',
        valorTotal: 45,
        duracao: 60,
        isNovoCliente: false,
        ultimoAtendimento: new Date('2023-12-20')
      },
      {
        id: '2',
        clienteNome: 'Pedro Santos',
        clienteTelefone: '(11) 88888-8888',
        servicoNome: 'Corte Masculino',
        dataHora: new Date('2024-01-15T10:30:00'),
        status: 'concluido',
        valorTotal: 30,
        duracao: 45,
        isNovoCliente: false,
        ultimoAtendimento: new Date('2024-01-05')
      },
      {
        id: '3',
        clienteNome: 'Lucas Oliveira',
        clienteTelefone: '(11) 77777-7777',
        servicoNome: 'Barba + Bigode',
        dataHora: new Date('2024-01-15T14:00:00'),
        status: 'confirmado',
        valorTotal: 25,
        duracao: 30,
        isNovoCliente: true,
        observacoes: 'Cliente prefere barba mais baixa'
      },
      {
        id: '4',
        clienteNome: 'André Costa',
        clienteTelefone: '(11) 66666-6666',
        servicoNome: 'Corte + Barba + Sobrancelha',
        dataHora: new Date('2024-01-15T16:30:00'),
        status: 'agendado',
        valorTotal: 55,
        duracao: 75,
        isNovoCliente: false,
        ultimoAtendimento: new Date('2024-01-08')
      },
      {
        id: '5',
        clienteNome: 'Rafael Lima',
        clienteTelefone: '(11) 55555-5555',
        servicoNome: 'Corte Degradê',
        dataHora: new Date('2024-01-15T18:00:00'),
        status: 'agendado',
        valorTotal: 35,
        duracao: 50,
        isNovoCliente: false,
        ultimoAtendimento: new Date('2023-12-15')
      },
      // Agendamentos da semana
      {
        id: '6',
        clienteNome: 'Carlos Mendes',
        clienteTelefone: '(11) 44444-4444',
        servicoNome: 'Corte + Barba',
        dataHora: new Date('2024-01-16T10:00:00'),
        status: 'agendado',
        valorTotal: 45,
        duracao: 60,
        isNovoCliente: false
      },
      {
        id: '7',
        clienteNome: 'Fernando Rocha',
        clienteTelefone: '(11) 33333-3333',
        servicoNome: 'Corte Masculino',
        dataHora: new Date('2024-01-17T15:30:00'),
        status: 'agendado',
        valorTotal: 30,
        duracao: 45,
        isNovoCliente: true
      }
    ]
  }

  static async getHistoricoClientes(barbeiroId: string): Promise<HistoricoCliente[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 700))
    
    return [
      {
        clienteId: '1',
        clienteNome: 'João Silva',
        clienteTelefone: '(11) 99999-9999',
        totalAtendimentos: 15,
        ultimoAtendimento: new Date('2024-01-15'),
        servicosFavoritos: ['Corte + Barba', 'Sobrancelha'],
        observacoes: 'Prefere corte baixo nas laterais, barba bem aparada',
        avaliacaoMedia: 5.0,
        valorTotalGasto: 675
      },
      {
        clienteId: '2',
        clienteNome: 'Pedro Santos',
        clienteTelefone: '(11) 88888-8888',
        totalAtendimentos: 8,
        ultimoAtendimento: new Date('2024-01-15'),
        servicosFavoritos: ['Corte Masculino', 'Relaxamento'],
        avaliacaoMedia: 4.8,
        valorTotalGasto: 240
      },
      {
        clienteId: '3',
        clienteNome: 'André Costa',
        clienteTelefone: '(11) 66666-6666',
        totalAtendimentos: 12,
        ultimoAtendimento: new Date('2024-01-08'),
        servicosFavoritos: ['Corte + Barba + Sobrancelha'],
        observacoes: 'Cliente executivo, sempre pontual',
        avaliacaoMedia: 4.9,
        valorTotalGasto: 660
      },
      {
        clienteId: '4',
        clienteNome: 'Rafael Lima',
        clienteTelefone: '(11) 55555-5555',
        totalAtendimentos: 6,
        ultimoAtendimento: new Date('2023-12-15'),
        servicosFavoritos: ['Corte Degradê', 'Barba'],
        avaliacaoMedia: 4.7,
        valorTotalGasto: 210
      },
      {
        clienteId: '5',
        clienteNome: 'Carlos Mendes',
        clienteTelefone: '(11) 44444-4444',
        totalAtendimentos: 3,
        ultimoAtendimento: new Date('2023-12-10'),
        servicosFavoritos: ['Corte + Barba'],
        avaliacaoMedia: 4.6,
        valorTotalGasto: 135
      },
      {
        clienteId: '6',
        clienteNome: 'Lucas Oliveira',
        clienteTelefone: '(11) 77777-7777',
        totalAtendimentos: 1,
        ultimoAtendimento: new Date('2024-01-15'),
        servicosFavoritos: ['Barba + Bigode'],
        avaliacaoMedia: 5.0,
        valorTotalGasto: 25
      }
    ]
  }

  static async getNotificacoes(barbeiroId: string): Promise<NotificacaoBarbeiro[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return [
      {
        id: '1',
        tipo: 'novo_agendamento',
        titulo: 'Novo agendamento',
        descricao: 'Fernando Rocha agendou Corte Masculino para amanhã às 15:30',
        agendamentoId: '7',
        criadoEm: new Date('2024-01-15T14:30:00'),
        lida: false,
        prioridade: 'media'
      },
      {
        id: '2',
        tipo: 'lembrete',
        titulo: 'Próximo cliente em 30 minutos',
        descricao: 'André Costa - Corte + Barba + Sobrancelha às 16:30',
        agendamentoId: '4',
        criadoEm: new Date('2024-01-15T16:00:00'),
        lida: false,
        prioridade: 'alta'
      },
      {
        id: '3',
        tipo: 'avaliacao',
        titulo: 'Nova avaliação recebida',
        descricao: 'João Silva avaliou seu atendimento com 5 estrelas',
        criadoEm: new Date('2024-01-15T09:30:00'),
        lida: true,
        prioridade: 'baixa'
      },
      {
        id: '4',
        tipo: 'cancelamento',
        titulo: 'Agendamento cancelado',
        descricao: 'Cliente Marcos cancelou o agendamento de hoje às 12:00',
        criadoEm: new Date('2024-01-15T08:45:00'),
        lida: true,
        prioridade: 'media'
      }
    ]
  }

  static async getPerformance(barbeiroId: string): Promise<PerformanceBarbeiro[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return [
      { periodo: 'Seg', agendamentos: 6, receita: 270, avaliacaoMedia: 4.8, clientesNovos: 1, tempoMedioServico: 45 },
      { periodo: 'Ter', agendamentos: 8, receita: 360, avaliacaoMedia: 4.9, clientesNovos: 2, tempoMedioServico: 48 },
      { periodo: 'Qua', agendamentos: 5, receita: 225, avaliacaoMedia: 4.7, clientesNovos: 0, tempoMedioServico: 42 },
      { periodo: 'Qui', agendamentos: 7, receita: 315, avaliacaoMedia: 4.9, clientesNovos: 1, tempoMedioServico: 46 },
      { periodo: 'Sex', agendamentos: 8, receita: 320, avaliacaoMedia: 4.8, clientesNovos: 2, tempoMedioServico: 44 },
      { periodo: 'Sáb', agendamentos: 10, receita: 450, avaliacaoMedia: 5.0, clientesNovos: 3, tempoMedioServico: 50 },
      { periodo: 'Dom', agendamentos: 0, receita: 0, avaliacaoMedia: 0, clientesNovos: 0, tempoMedioServico: 0 }
    ]
  }

  static async updateAgendamentoStatus(
    agendamentoId: string, 
    status: AgendamentoBarbeiro['status']
  ): Promise<void> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    console.log(`Agendamento ${agendamentoId} atualizado para ${status}`)
  }

  static async marcarNotificacaoLida(notificacaoId: string): Promise<void> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    console.log(`Notificação ${notificacaoId} marcada como lida`)
  }
}