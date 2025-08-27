// Serviços para o dashboard do Admin SaaS

import { MetricasAssinatura, BarbeariaStatus, DadosGrafico, AlertaAdmin } from '../types/admin-saas'

// Mock data - em produção, estes dados viriam da API
export class AdminSaasService {
  static async getMetricasAssinatura(): Promise<MetricasAssinatura> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      totalBarbearias: 47,
      barbeariasPagantes: 42,
      receitaMensal: 18750,
      receitaAnual: 225000,
      novosCadastros: 8,
      cancelamentos: 2,
      taxaCrescimento: 15.3
    }
  }

  static async getBarbearias(): Promise<BarbeariaStatus[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return [
      {
        id: '1',
        nome: 'Barbearia do João',
        email: 'joao@barbearia.com',
        telefone: '(11) 99999-9999',
        plano: 'Intermediário',
        statusPagamento: 'em_dia',
        proximoVencimento: new Date('2024-02-15'),
        valorMensal: 89.90,
        ativa: true,
        criadaEm: new Date('2023-08-15'),
        ultimoLogin: new Date('2024-01-10')
      },
      {
        id: '2',
        nome: 'Style Cut Premium',
        email: 'contato@stylecut.com',
        telefone: '(11) 88888-8888',
        plano: 'Avançado',
        statusPagamento: 'pendente',
        proximoVencimento: new Date('2024-01-20'),
        valorMensal: 149.90,
        ativa: true,
        criadaEm: new Date('2023-09-22'),
        ultimoLogin: new Date('2024-01-08')
      },
      {
        id: '3',
        nome: 'Barber Shop Classic',
        email: 'classic@barber.com',
        telefone: '(11) 77777-7777',
        plano: 'Básico',
        statusPagamento: 'vencido',
        proximoVencimento: new Date('2024-01-05'),
        valorMensal: 49.90,
        ativa: false,
        criadaEm: new Date('2023-07-10'),
        ultimoLogin: new Date('2023-12-28')
      },
      {
        id: '4',
        nome: 'Elite Barbershop',
        email: 'elite@barbershop.com',
        telefone: '(11) 66666-6666',
        plano: 'Multi-unidade',
        statusPagamento: 'em_dia',
        proximoVencimento: new Date('2024-02-28'),
        valorMensal: 299.90,
        ativa: true,
        criadaEm: new Date('2023-06-05'),
        ultimoLogin: new Date('2024-01-11')
      },
      {
        id: '5',
        nome: 'Corte & Estilo',
        email: 'corte@estilo.com',
        telefone: '(11) 55555-5555',
        plano: 'Intermediário',
        statusPagamento: 'em_dia',
        proximoVencimento: new Date('2024-02-10'),
        valorMensal: 89.90,
        ativa: true,
        criadaEm: new Date('2023-10-12'),
        ultimoLogin: new Date('2024-01-09')
      }
    ]
  }

  static async getDadosGraficoReceita(): Promise<DadosGrafico[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return [
      { mes: 'Jul', receita: 12500, novasBarbearias: 5, cancelamentos: 1 },
      { mes: 'Ago', receita: 14200, novasBarbearias: 7, cancelamentos: 2 },
      { mes: 'Set', receita: 15800, novasBarbearias: 6, cancelamentos: 1 },
      { mes: 'Out', receita: 16900, novasBarbearias: 8, cancelamentos: 3 },
      { mes: 'Nov', receita: 17500, novasBarbearias: 9, cancelamentos: 2 },
      { mes: 'Dez', receita: 18750, novasBarbearias: 8, cancelamentos: 2 }
    ]
  }

  static async getAlertas(): Promise<AlertaAdmin[]> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return [
      {
        id: '1',
        tipo: 'pagamento_vencido',
        titulo: 'Pagamento em atraso',
        descricao: 'Barber Shop Classic está com pagamento vencido há 7 dias',
        barbeariaId: '3',
        criadoEm: new Date('2024-01-12'),
        lido: false
      },
      {
        id: '2',
        tipo: 'novo_cadastro',
        titulo: 'Nova barbearia cadastrada',
        descricao: 'Corte & Estilo se cadastrou no plano Intermediário',
        barbeariaId: '5',
        criadoEm: new Date('2024-01-11'),
        lido: false
      },
      {
        id: '3',
        tipo: 'suporte',
        titulo: 'Solicitação de suporte',
        descricao: 'Style Cut Premium solicitou ajuda com configuração de horários',
        barbeariaId: '2',
        criadoEm: new Date('2024-01-10'),
        lido: true
      }
    ]
  }

  static async toggleBarbeariaStatus(id: string, ativa: boolean): Promise<void> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log(`Barbearia ${id} ${ativa ? 'ativada' : 'desativada'}`)
  }

  static async getBarbeariaDetails(id: string): Promise<BarbeariaStatus | null> {
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const barbearias = await this.getBarbearias()
    return barbearias.find(b => b.id === id) || null
  }
}