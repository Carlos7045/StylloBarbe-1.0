// Serviço para gerenciar dados do dashboard do cliente

import { 
  PerfilCliente, 
  AgendamentoCliente, 
  BarbeiroFavorito, 
  ServicoFavorito, 
  MetricasCliente,
  NotificacaoCliente 
} from '../types/cliente-dashboard'

export class ClienteDashboardService {
  // Buscar perfil do cliente
  async buscarPerfil(clienteId: string): Promise<PerfilCliente> {
    // Simulação - substituir por chamada real à API
    return {
      id: clienteId,
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      cpf: '123.456.789-00',
      dataNascimento: new Date('1990-05-15'),
      endereco: {
        cep: '01234-567',
        rua: 'Rua das Flores, 123',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP'
      },
      criadoEm: new Date('2024-01-15')
    }
  }

  // Atualizar perfil do cliente
  async atualizarPerfil(clienteId: string, dados: Partial<PerfilCliente>): Promise<PerfilCliente> {
    // Simulação - substituir por chamada real à API
    console.log('Atualizando perfil:', { clienteId, dados })
    
    const perfilAtual = await this.buscarPerfil(clienteId)
    return { ...perfilAtual, ...dados }
  }

  // Buscar agendamentos do cliente
  async buscarAgendamentos(clienteId: string): Promise<AgendamentoCliente[]> {
    // Simulação - substituir por chamada real à API
    return [
      {
        id: '1',
        barbeariaId: 'barb1',
        barbeariaNome: 'Barbearia Central',
        barbeariaEndereco: 'Rua Principal, 100',
        barbeiroId: 'barb1',
        barbeiroNome: 'João Barbeiro',
        servicoId: 'serv1',
        servicoNome: 'Corte + Barba',
        dataHora: new Date('2025-01-16T15:00:00'),
        status: 'agendado',
        valorTotal: 45.00,
        duracao: 60,
        podeReagendar: true,
        podeCancelar: true
      },
      {
        id: '2',
        barbeariaId: 'barb1',
        barbeariaNome: 'Barbearia Central',
        barbeariaEndereco: 'Rua Principal, 100',
        barbeiroId: 'barb1',
        barbeiroNome: 'João Barbeiro',
        servicoId: 'serv2',
        servicoNome: 'Corte',
        dataHora: new Date('2025-01-08T14:30:00'),
        status: 'concluido',
        valorTotal: 30.00,
        duracao: 45,
        podeReagendar: false,
        podeCancelar: false,
        avaliacaoCliente: {
          nota: 5,
          comentario: 'Excelente atendimento!',
          criadaEm: new Date('2025-01-08T16:00:00')
        }
      },
      {
        id: '3',
        barbeariaId: 'barb1',
        barbeariaNome: 'Barbearia Central',
        barbeariaEndereco: 'Rua Principal, 100',
        barbeiroId: 'barb2',
        barbeiroNome: 'Pedro Costa',
        servicoId: 'serv1',
        servicoNome: 'Corte + Barba',
        dataHora: new Date('2024-12-22T16:00:00'),
        status: 'concluido',
        valorTotal: 45.00,
        duracao: 60,
        podeReagendar: false,
        podeCancelar: false,
        avaliacaoCliente: {
          nota: 4,
          comentario: 'Muito bom!',
          criadaEm: new Date('2024-12-22T17:30:00')
        }
      }
    ]
  }

  // Buscar barbeiros favoritos
  async buscarBarbeirosFavoritos(clienteId: string): Promise<BarbeiroFavorito[]> {
    // Simulação - substituir por chamada real à API
    return [
      {
        id: 'barb1',
        nome: 'João Barbeiro',
        barbeariaId: 'barb1',
        barbeariaNome: 'Barbearia Central',
        especialidades: ['Corte Masculino', 'Barba', 'Bigode'],
        avaliacaoMedia: 4.8,
        totalAtendimentos: 15,
        ultimoAtendimento: new Date('2025-01-08T14:30:00'),
        servicosFavoritos: ['Corte + Barba', 'Corte']
      },
      {
        id: 'barb2',
        nome: 'Pedro Costa',
        barbeariaId: 'barb1',
        barbeariaNome: 'Barbearia Central',
        especialidades: ['Corte Moderno', 'Degradê'],
        avaliacaoMedia: 4.5,
        totalAtendimentos: 3,
        ultimoAtendimento: new Date('2024-12-22T16:00:00'),
        servicosFavoritos: ['Corte + Barba']
      }
    ]
  }

  // Buscar serviços favoritos
  async buscarServicosFavoritos(clienteId: string): Promise<ServicoFavorito[]> {
    // Simulação - substituir por chamada real à API
    return [
      {
        id: 'serv1',
        nome: 'Corte + Barba',
        descricao: 'Corte de cabelo masculino + barba completa',
        preco: 45.00,
        duracao: 60,
        categoria: 'combo',
        barbeariaId: 'barb1',
        barbeariaNome: 'Barbearia Central',
        totalRealizados: 12,
        ultimaVez: new Date('2025-01-08T14:30:00')
      },
      {
        id: 'serv2',
        nome: 'Corte',
        descricao: 'Corte de cabelo masculino',
        preco: 30.00,
        duracao: 45,
        categoria: 'corte',
        barbeariaId: 'barb1',
        barbeariaNome: 'Barbearia Central',
        totalRealizados: 8,
        ultimaVez: new Date('2024-11-15T15:00:00')
      }
    ]
  }

  // Buscar métricas do cliente
  async buscarMetricas(clienteId: string): Promise<MetricasCliente> {
    // Simulação - substituir por chamada real à API
    return {
      totalAgendamentos: 24,
      totalGasto: 1080.00,
      barbeariasFavoritas: 2,
      barbeirosFavoritos: 3,
      avaliacaoMediaDada: 4.7,
      proximoAgendamento: new Date('2025-01-16T15:00:00'),
      ultimoAtendimento: new Date('2025-01-08T14:30:00'),
      servicoMaisRealizado: 'Corte + Barba'
    }
  }

  // Reagendar agendamento
  async reagendarAgendamento(agendamentoId: string, novaDataHora: Date): Promise<AgendamentoCliente> {
    // Simulação - substituir por chamada real à API
    console.log('Reagendando:', { agendamentoId, novaDataHora })
    
    const agendamentos = await this.buscarAgendamentos('cliente1')
    const agendamento = agendamentos.find(a => a.id === agendamentoId)
    
    if (!agendamento) {
      throw new Error('Agendamento não encontrado')
    }

    return {
      ...agendamento,
      dataHora: novaDataHora,
      status: 'agendado'
    }
  }

  // Cancelar agendamento
  async cancelarAgendamento(agendamentoId: string, motivo?: string): Promise<void> {
    // Simulação - substituir por chamada real à API
    console.log('Cancelando agendamento:', { agendamentoId, motivo })
  }

  // Adicionar barbeiro aos favoritos
  async adicionarBarbeiroFavorito(clienteId: string, barbeiroId: string): Promise<void> {
    // Simulação - substituir por chamada real à API
    console.log('Adicionando barbeiro aos favoritos:', { clienteId, barbeiroId })
  }

  // Remover barbeiro dos favoritos
  async removerBarbeiroFavorito(clienteId: string, barbeiroId: string): Promise<void> {
    // Simulação - substituir por chamada real à API
    console.log('Removendo barbeiro dos favoritos:', { clienteId, barbeiroId })
  }

  // Adicionar serviço aos favoritos
  async adicionarServicoFavorito(clienteId: string, servicoId: string): Promise<void> {
    // Simulação - substituir por chamada real à API
    console.log('Adicionando serviço aos favoritos:', { clienteId, servicoId })
  }

  // Remover serviço dos favoritos
  async removerServicoFavorito(clienteId: string, servicoId: string): Promise<void> {
    // Simulação - substituir por chamada real à API
    console.log('Removendo serviço dos favoritos:', { clienteId, servicoId })
  }

  // Buscar notificações
  async buscarNotificacoes(clienteId: string): Promise<NotificacaoCliente[]> {
    // Simulação - substituir por chamada real à API
    return [
      {
        id: '1',
        tipo: 'lembrete',
        titulo: 'Lembrete de Agendamento',
        descricao: 'Seu agendamento é amanhã às 15:00 na Barbearia Central',
        agendamentoId: '1',
        criadoEm: new Date(),
        lida: false,
        prioridade: 'alta'
      },
      {
        id: '2',
        tipo: 'promocao',
        titulo: 'Promoção Especial',
        descricao: '20% de desconto em cortes durante esta semana!',
        criadoEm: new Date(Date.now() - 86400000),
        lida: true,
        prioridade: 'media'
      }
    ]
  }
}

export const clienteDashboardService = new ClienteDashboardService()