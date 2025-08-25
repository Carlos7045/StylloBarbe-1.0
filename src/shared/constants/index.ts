// Constantes da aplicação

export const USER_ROLES = {
  ADMIN_SAAS: 'admin_saas',
  ADMIN_BARBEARIA: 'admin_barbearia',
  BARBEIRO: 'barbeiro',
  CLIENTE: 'cliente',
} as const

export const APPOINTMENT_STATUS = {
  AGENDADO: 'agendado',
  CONFIRMADO: 'confirmado',
  EM_ANDAMENTO: 'em_andamento',
  CONCLUIDO: 'concluido',
  CANCELADO: 'cancelado',
} as const

export const SERVICE_CATEGORIES = {
  CORTE: 'corte',
  BARBA: 'barba',
  COMBO: 'combo',
  OUTROS: 'outros',
} as const

export const PAYMENT_METHODS = {
  DINHEIRO: 'dinheiro',
  PIX: 'pix',
  CARTAO: 'cartao',
  BOLETO: 'boleto',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  CADASTRO: '/cadastro',
  AGENDAMENTO: '/agendamento',
  DASHBOARD: {
    ADMIN_SAAS: '/admin-saas',
    ADMIN_BARBEARIA: '/admin-barbearia',
    BARBEIRO: '/barbeiro',
    CLIENTE: '/cliente',
  },
} as const
