// Tipos específicos para o dashboard do Cliente

export interface PerfilCliente {
  id: string
  nome: string
  email: string
  telefone: string
  cpf?: string
  dataNascimento?: Date
  endereco?: {
    cep: string
    rua: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    estado: string
  }
  avatar?: string
  criadoEm: Date
}

export interface AgendamentoCliente {
  id: string
  barbeariaId: string
  barbeariaNome: string
  barbeariaEndereco: string
  barbeiroId: string
  barbeiroNome: string
  barbeiroAvatar?: string
  servicoId: string
  servicoNome: string
  dataHora: Date
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado'
  valorTotal: number
  duracao: number
  observacoes?: string
  avaliacaoCliente?: {
    nota: number
    comentario?: string
    criadaEm: Date
  }
  podeReagendar: boolean
  podeCancelar: boolean
}

export interface BarbeiroFavorito {
  id: string
  nome: string
  avatar?: string
  barbeariaId: string
  barbeariaNome: string
  especialidades: string[]
  avaliacaoMedia: number
  totalAtendimentos: number
  ultimoAtendimento: Date
  servicosFavoritos: string[]
}

export interface ServicoFavorito {
  id: string
  nome: string
  descricao: string
  preco: number
  duracao: number
  categoria: string
  barbeariaId: string
  barbeariaNome: string
  totalRealizados: number
  ultimaVez: Date
}

export interface HistoricoAtendimento {
  id: string
  dataHora: Date
  barbeariaNome: string
  barbeiroNome: string
  servicoNome: string
  valorPago: number
  avaliacaoCliente?: {
    nota: number
    comentario?: string
  }
  observacoes?: string
  fotos?: string[]
}

export interface MetricasCliente {
  totalAgendamentos: number
  totalGasto: number
  barbeariasFavoritas: number
  barbeirosFavoritos: number
  avaliacaoMediaDada: number
  proximoAgendamento?: Date
  ultimoAtendimento?: Date
  servicoMaisRealizado: string
}

export interface NotificacaoCliente {
  id: string
  tipo: 'lembrete' | 'confirmacao' | 'promocao' | 'avaliacao' | 'reagendamento'
  titulo: string
  descricao: string
  agendamentoId?: string
  criadoEm: Date
  lida: boolean
  prioridade: 'baixa' | 'media' | 'alta'
}