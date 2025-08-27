// Tipos específicos para o dashboard do Barbeiro

export interface MetricasBarbeiro {
  agendamentosHoje: number
  agendamentosSemana: number
  receitaHoje: number
  receitaSemana: number
  receitaMes: number
  clientesAtendidos: number
  proximoAgendamento?: Date
  avaliacaoMedia: number
  totalAvaliacoes: number
}

export interface AgendamentoBarbeiro {
  id: string
  clienteNome: string
  clienteTelefone: string
  clienteAvatar?: string
  servicoNome: string
  dataHora: Date
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado'
  valorTotal: number
  duracao: number // em minutos
  observacoes?: string
  isNovoCliente: boolean
  ultimoAtendimento?: Date
}

export interface HistoricoCliente {
  clienteId: string
  clienteNome: string
  clienteTelefone: string
  clienteAvatar?: string
  totalAtendimentos: number
  ultimoAtendimento: Date
  servicosFavoritos: string[]
  observacoes?: string
  avaliacaoMedia: number
  valorTotalGasto: number
}

export interface NotificacaoBarbeiro {
  id: string
  tipo: 'novo_agendamento' | 'cancelamento' | 'reagendamento' | 'lembrete' | 'avaliacao'
  titulo: string
  descricao: string
  agendamentoId?: string
  criadoEm: Date
  lida: boolean
  prioridade: 'baixa' | 'media' | 'alta'
}

export interface PerformanceBarbeiro {
  periodo: string
  agendamentos: number
  receita: number
  avaliacaoMedia: number
  clientesNovos: number
  tempoMedioServico: number
}

export interface ConfiguracaoBarbeiro {
  id: string
  nome: string
  especialidades: string[]
  horarioTrabalho: {
    [key: string]: {
      inicio: string
      fim: string
      ativo: boolean
    }
  }
  pausas: Array<{
    inicio: string
    fim: string
    descricao: string
  }>
  servicosDisponiveis: string[]
}