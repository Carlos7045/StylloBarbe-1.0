// Tipos específicos para o dashboard do Admin Barbearia

export interface MetricasBarbearia {
  agendamentosHoje: number
  receitaHoje: number
  receitaMes: number
  clientesAtendidos: number
  proximosAgendamentos: number
  barbeirosAtivos: number
  taxaOcupacao: number
  avaliacaoMedia: number
}

export interface AgendamentoResumo {
  id: string
  clienteNome: string
  clienteTelefone: string
  barbeiroNome: string
  servicoNome: string
  dataHora: Date
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado'
  valorTotal: number
  observacoes?: string
}

export interface BarbeiroResumo {
  id: string
  nome: string
  avatar?: string
  especialidades: string[]
  agendamentosHoje: number
  receitaHoje: number
  proximoAgendamento?: Date
  status: 'disponivel' | 'ocupado' | 'ausente'
}

export interface AlertaBarbearia {
  id: string
  tipo: 'agendamento_proximo' | 'conflito_horario' | 'cliente_aguardando' | 'pagamento_pendente'
  titulo: string
  descricao: string
  agendamentoId?: string
  prioridade: 'baixa' | 'media' | 'alta'
  criadoEm: Date
}

export interface PerformanceBarbearia {
  periodo: string
  agendamentos: number
  receita: number
  clientesNovos: number
  avaliacaoMedia: number
}

export interface ConfiguracaoBarbearia {
  id: string
  nome: string
  endereco: string
  telefone: string
  email: string
  horarioFuncionamento: {
    [key: string]: {
      abertura: string
      fechamento: string
      ativo: boolean
    }
  }
  intervalos: Array<{
    inicio: string
    fim: string
    descricao: string
  }>
}