export type TipoFuncionario = 'barbeiro' | 'recepcionista' | 'admin_barbearia'

export type StatusFuncionario = 'ativo' | 'inativo' | 'suspenso'

export interface Especialidade {
  id: string
  nome: string
  descricao?: string
}

export interface HorarioTrabalho {
  diaSemana: number // 0-6 (domingo-sábado)
  horaInicio: string // HH:mm
  horaFim: string // HH:mm
  ativo: boolean
}

export interface Funcionario {
  id: string
  barbeariaId: string
  nome: string
  email: string
  telefone: string
  tipo: TipoFuncionario
  status: StatusFuncionario
  avatar?: string
  especialidades: Especialidade[]
  horarios: HorarioTrabalho[]
  dataAdmissao: Date
  observacoes?: string
  criadoEm: Date
  atualizadoEm: Date
}

export interface CriarFuncionarioData {
  nome: string
  email: string
  telefone: string
  tipo: TipoFuncionario
  especialidades: string[] // IDs das especialidades
  horarios: Omit<HorarioTrabalho, 'ativo'>[]
  observacoes?: string
}

export interface AtualizarFuncionarioData extends Partial<CriarFuncionarioData> {
  status?: StatusFuncionario
}

export interface FiltrosFuncionarios {
  tipo?: TipoFuncionario
  status?: StatusFuncionario
  especialidade?: string
  busca?: string
}