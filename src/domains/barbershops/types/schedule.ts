export interface HorarioFuncionamento {
  id: string
  diaSemana: number // 0-6 (domingo-sábado)
  horaAbertura: string // HH:mm
  horaFechamento: string // HH:mm
  ativo: boolean
}

export interface IntervaloTrabalho {
  id: string
  nome: string
  horaInicio: string // HH:mm
  horaFim: string // HH:mm
  diasSemana: number[] // Array de dias da semana
  ativo: boolean
}

export interface BloqueioTemporario {
  id: string
  titulo: string
  descricao?: string
  dataInicio: Date
  dataFim: Date
  horaInicio?: string // Se não especificado, bloqueia o dia todo
  horaFim?: string
  barbeiroIds: string[] // Se vazio, aplica a toda barbearia
  tipo: 'ferias' | 'feriado' | 'manutencao' | 'evento' | 'outros'
  ativo: boolean
  criadoEm: Date
}

export interface ConfiguracaoAgendamento {
  antecedenciaMinima: number // em horas
  antecedenciaMaxima: number // em dias
  intervaloPadrao: number // em minutos entre agendamentos
  permitirAgendamentoSabado: boolean
  permitirAgendamentoDomingo: boolean
  permitirAgendamentoFeriado: boolean
  cancelamentoAntecedencia: number // em horas
  reagendamentoAntecedencia: number // em horas
}

export interface ConfiguracaoHorarios {
  id: string
  barbeariaId: string
  horariosFuncionamento: HorarioFuncionamento[]
  intervalos: IntervaloTrabalho[]
  bloqueios: BloqueioTemporario[]
  configuracaoAgendamento: ConfiguracaoAgendamento
  atualizadoEm: Date
}

export interface CriarBloqueioData {
  titulo: string
  descricao?: string
  dataInicio: Date
  dataFim: Date
  horaInicio?: string
  horaFim?: string
  barbeiroIds: string[]
  tipo: BloqueioTemporario['tipo']
}

export interface AtualizarBloqueioData extends Partial<CriarBloqueioData> {
  ativo?: boolean
}