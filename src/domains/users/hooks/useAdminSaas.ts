import { useState, useEffect } from 'react'

// Mock data - em produção viria de uma API
const mockMetricas = {
  totalBarbearias: 156,
  barbeariasPendentes: 8,
  receitaMensal: 45000,
  receitaAnual: 540000,
  totalUsuarios: 2340,
  agendamentosMes: 12500,
  taxaCrescimento: 12.5,
  avaliacaoMedia: 4.7
}

const mockBarbearias = [
  {
    id: '1',
    nome: 'Barbearia Premium',
    proprietario: 'Carlos Silva',
    email: 'carlos@premium.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    status: 'ativa' as const,
    plano: 'avancado' as const,
    barbeiros: 5,
    agendamentosMes: 450,
    receitaMes: 15000,
    dataCadastro: new Date('2024-01-15'),
    ultimoAcesso: new Date('2024-02-20')
  },
  {
    id: '2',
    nome: 'Studio Masculino',
    proprietario: 'João Santos',
    email: 'joao@studio.com',
    telefone: '(21) 88888-8888',
    endereco: 'Av. Principal, 456',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    status: 'ativa' as const,
    plano: 'intermediario' as const,
    barbeiros: 3,
    agendamentosMes: 280,
    receitaMes: 8500,
    dataCadastro: new Date('2024-01-20'),
    ultimoAcesso: new Date('2024-02-19')
  },
  {
    id: '3',
    nome: 'Cortes & Estilo',
    proprietario: 'Pedro Costa',
    email: 'pedro@cortes.com',
    telefone: '(31) 77777-7777',
    endereco: 'Rua Central, 789',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    status: 'pendente' as const,
    plano: 'basico' as const,
    barbeiros: 2,
    agendamentosMes: 120,
    receitaMes: 3500,
    dataCadastro: new Date('2024-02-10'),
    ultimoAcesso: new Date('2024-02-18')
  }
]

const mockAlertas = [
  {
    id: '1',
    titulo: 'Nova barbearia pendente de aprovação',
    descricao: 'Barbearia "Cortes & Estilo" aguarda aprovação há 3 dias',
    tipo: 'warning' as const,
    prioridade: 'alta' as const,
    lido: false,
    criadoEm: new Date('2024-02-18T10:30:00'),
    barbeariaId: '3',
    barbeariaNome: 'Cortes & Estilo'
  },
  {
    id: '2',
    titulo: 'Pagamento em atraso',
    descricao: 'Barbearia Premium com pagamento em atraso há 2 dias',
    tipo: 'error' as const,
    prioridade: 'alta' as const,
    lido: false,
    criadoEm: new Date('2024-02-17T14:20:00'),
    barbeariaId: '1',
    barbeariaNome: 'Barbearia Premium'
  },
  {
    id: '3',
    titulo: 'Meta de crescimento atingida',
    descricao: 'Meta mensal de novas barbearias foi atingida com sucesso',
    tipo: 'success' as const,
    prioridade: 'media' as const,
    lido: true,
    criadoEm: new Date('2024-02-15T09:15:00')
  }
]

const mockDadosGrafico = [
  { mes: 'Jan', receita: 38000, barbearias: 145, agendamentos: 11200 },
  { mes: 'Fev', receita: 45000, barbearias: 156, agendamentos: 12500 },
  { mes: 'Mar', receita: 42000, barbearias: 152, agendamentos: 11800 },
  { mes: 'Abr', receita: 48000, barbearias: 160, agendamentos: 13200 },
  { mes: 'Mai', receita: 52000, barbearias: 168, agendamentos: 14100 },
  { mes: 'Jun', receita: 55000, barbearias: 175, agendamentos: 15000 }
]

export function useAdminSaasMetrics() {
  const [metricas, setMetricas] = useState(mockMetricas)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { metricas, loading }
}

export function useAdminSaasBarbearias() {
  const [barbearias, setBarbearias] = useState(mockBarbearias)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  const toggleStatus = (id: string, novoStatus: any) => {
    setBarbearias(prev => 
      prev.map(barbearia => 
        barbearia.id === id 
          ? { ...barbearia, status: novoStatus }
          : barbearia
      )
    )
  }

  return { barbearias, loading, toggleStatus }
}

export function useAdminSaasCharts() {
  const [dadosGrafico, setDadosGrafico] = useState(mockDadosGrafico)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return { dadosGrafico, loading }
}

export function useAdminSaasAlertas() {
  const [alertas, setAlertas] = useState(mockAlertas)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  const marcarComoLido = (id: string) => {
    setAlertas(prev => 
      prev.map(alerta => 
        alerta.id === id 
          ? { ...alerta, lido: true }
          : alerta
      )
    )
  }

  return { alertas, loading, marcarComoLido }
}