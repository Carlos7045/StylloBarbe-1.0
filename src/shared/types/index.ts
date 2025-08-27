// Tipos globais da aplicação

export type UserRole = 'admin_saas' | 'admin_barbearia' | 'barbeiro' | 'cliente'

export interface AuthUser {
  id: string
  email: string
  nome: string
  telefone?: string
  cpf?: string
  role: UserRole
  barbeariaId?: string
  avatarUrl?: string
}

export interface Barbearia {
  id: string
  nome: string
  endereco: string
  telefone: string
  email: string
  logo?: string
  planoId: string
  ativa: boolean
  criadaEm: Date
}

export interface Servico {
  id: string
  barbeariaId: string
  nome: string
  descricao: string
  preco: number
  duracao: number // em minutos
  ativo: boolean
  categoria: 'corte' | 'barba' | 'combo' | 'outros'
}

export interface Agendamento {
  id: string
  barbeariaId: string
  clienteId: string
  barbeiroId: string
  servicoId: string
  dataHora: Date
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado'
  observacoes?: string
  valorTotal: number
  formaPagamento?: 'dinheiro' | 'pix' | 'cartao' | 'boleto'
  pagamentoId?: string
  criadoEm: Date
}

export interface Plano {
  id: string
  nome: string
  preco: number
  periodo: 'mensal' | 'anual'
  recursos: string[]
  limiteBarbeiros: number
  limiteAgendamentos: number
  ativo: boolean
}
