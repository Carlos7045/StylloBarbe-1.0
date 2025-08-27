export type CategoriaServico = 'corte' | 'barba' | 'combo' | 'outros'

export type StatusServico = 'ativo' | 'inativo'

export interface Servico {
  id: string
  barbeariaId: string
  nome: string
  descricao: string
  categoria: CategoriaServico
  preco: number
  duracao: number // em minutos
  status: StatusServico
  barbeiroIds: string[] // IDs dos barbeiros que podem realizar este serviço
  imagem?: string
  observacoes?: string
  criadoEm: Date
  atualizadoEm: Date
}

export interface CriarServicoData {
  nome: string
  descricao: string
  categoria: CategoriaServico
  preco: number
  duracao: number
  barbeiroIds: string[]
  imagem?: string
  observacoes?: string
}

export interface AtualizarServicoData extends Partial<CriarServicoData> {
  status?: StatusServico
}

export interface FiltrosServicos {
  categoria?: CategoriaServico
  status?: StatusServico
  barbeiroId?: string
  busca?: string
  precoMin?: number
  precoMax?: number
}

export interface ServicoComBarbeiros extends Servico {
  barbeiros: {
    id: string
    nome: string
  }[]
}