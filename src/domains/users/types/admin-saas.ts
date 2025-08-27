// Tipos específicos para o dashboard do Admin SaaS

export interface MetricasAssinatura {
  totalBarbearias: number
  barbeariasPagantes: number
  receitaMensal: number
  receitaAnual: number
  novosCadastros: number
  cancelamentos: number
  taxaCrescimento: number
}

export interface BarbeariaStatus {
  id: string
  nome: string
  email: string
  telefone: string
  plano: string
  statusPagamento: 'em_dia' | 'pendente' | 'vencido' | 'cancelado'
  proximoVencimento: Date
  valorMensal: number
  ativa: boolean
  criadaEm: Date
  ultimoLogin?: Date
}

export interface DadosGrafico {
  mes: string
  receita: number
  novasBarbearias: number
  cancelamentos: number
}

export interface AlertaAdmin {
  id: string
  tipo: 'pagamento_vencido' | 'novo_cadastro' | 'cancelamento' | 'suporte'
  titulo: string
  descricao: string
  barbeariaId?: string
  criadoEm: Date
  lido: boolean
}