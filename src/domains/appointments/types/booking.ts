export interface Barbearia {
  id: string
  nome: string
  endereco: string
  telefone: string
  email: string
  logo?: string
  ativa: boolean
  avaliacao?: number
  totalAvaliacoes?: number
  distancia?: number // em km
  tempoEstimado?: number // em minutos
  redeId?: string // ID da rede/grupo de barbearias
  adminId?: string // ID do admin que gerencia esta barbearia
}

export interface ServicoBooking {
  id: string
  nome: string
  descricao: string
  categoria: 'corte' | 'barba' | 'combo' | 'outros'
  preco: number
  duracao: number // em minutos
  imagem?: string
  barbeiros: BarbeiroBooking[]
}

export interface BarbeiroBooking {
  id: string
  nome: string
  foto?: string
  especialidades: string[]
  avaliacao?: number
  totalAvaliacoes?: number
  disponivel: boolean
}

export interface FiltrosBarbearia {
  busca?: string
  cidade?: string
  bairro?: string
  distanciaMaxima?: number
  avaliacaoMinima?: number
  redeId?: string // Filtrar por rede específica
  adminId?: string // Filtrar por admin específico
}

export interface FiltrosServico {
  categoria?: 'corte' | 'barba' | 'combo' | 'outros'
  precoMin?: number
  precoMax?: number
  duracaoMax?: number
  busca?: string
}

export interface FiltrosBarbeiro {
  especialidade?: string
  avaliacaoMinima?: number
  disponivel?: boolean
}

export interface SelecaoAgendamento {
  barbearia?: Barbearia
  servico?: ServicoBooking
  barbeiro?: BarbeiroBooking | 'qualquer'
  dataHora?: Date
  observacoes?: string
}

export interface DadosCliente {
  nome: string
  telefone: string
  email?: string
  cpf?: string
}

export interface ResumoAgendamento extends SelecaoAgendamento {
  cliente: DadosCliente
  valorTotal: number
  tempoEstimado: number
}