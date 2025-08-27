import { 
  Servico, 
  CriarServicoData, 
  AtualizarServicoData, 
  FiltrosServicos,
  ServicoComBarbeiros,
  StatusServico
} from '../types/service'

// Mock data para desenvolvimento
const mockServicos: Servico[] = [
  {
    id: '1',
    barbeariaId: 'barbearia-1',
    nome: 'Corte Masculino Tradicional',
    descricao: 'Corte clássico masculino com acabamento profissional',
    categoria: 'corte',
    preco: 35.00,
    duracao: 30,
    status: 'ativo',
    barbeiroIds: ['1', '2'],
    criadoEm: new Date('2024-01-15'),
    atualizadoEm: new Date('2024-01-15')
  },
  {
    id: '2',
    barbeariaId: 'barbearia-1',
    nome: 'Barba Completa',
    descricao: 'Aparar e modelar barba com navalha e produtos premium',
    categoria: 'barba',
    preco: 25.00,
    duracao: 20,
    status: 'ativo',
    barbeiroIds: ['1'],
    criadoEm: new Date('2024-01-15'),
    atualizadoEm: new Date('2024-01-15')
  },
  {
    id: '3',
    barbeariaId: 'barbearia-1',
    nome: 'Combo Corte + Barba',
    descricao: 'Corte completo + barba modelada com desconto especial',
    categoria: 'combo',
    preco: 50.00,
    duracao: 45,
    status: 'ativo',
    barbeiroIds: ['1', '2'],
    criadoEm: new Date('2024-01-15'),
    atualizadoEm: new Date('2024-01-15')
  },
  {
    id: '4',
    barbeariaId: 'barbearia-1',
    nome: 'Corte Degradê',
    descricao: 'Corte moderno com degradê lateral e acabamento detalhado',
    categoria: 'corte',
    preco: 40.00,
    duracao: 35,
    status: 'ativo',
    barbeiroIds: ['2'],
    criadoEm: new Date('2024-02-01'),
    atualizadoEm: new Date('2024-02-01')
  }
]

// Mock de barbeiros para associação
const mockBarbeiros = [
  { id: '1', nome: 'João Silva' },
  { id: '2', nome: 'Pedro Santos' },
  { id: '3', nome: 'Carlos Oliveira' }
]

export class ServiceService {
  static async listarServicos(
    barbeariaId: string, 
    filtros?: FiltrosServicos
  ): Promise<ServicoComBarbeiros[]> {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let servicos = mockServicos.filter(s => s.barbeariaId === barbeariaId)
    
    if (filtros) {
      if (filtros.categoria) {
        servicos = servicos.filter(s => s.categoria === filtros.categoria)
      }
      if (filtros.status) {
        servicos = servicos.filter(s => s.status === filtros.status)
      }
      if (filtros.barbeiroId) {
        servicos = servicos.filter(s => s.barbeiroIds.includes(filtros.barbeiroId!))
      }
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase()
        servicos = servicos.filter(s => 
          s.nome.toLowerCase().includes(busca) ||
          s.descricao.toLowerCase().includes(busca)
        )
      }
      if (filtros.precoMin !== undefined) {
        servicos = servicos.filter(s => s.preco >= filtros.precoMin!)
      }
      if (filtros.precoMax !== undefined) {
        servicos = servicos.filter(s => s.preco <= filtros.precoMax!)
      }
    }
    
    // Adicionar informações dos barbeiros
    return servicos.map(servico => ({
      ...servico,
      barbeiros: mockBarbeiros.filter(b => servico.barbeiroIds.includes(b.id))
    }))
  }

  static async obterServico(id: string): Promise<ServicoComBarbeiros | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const servico = mockServicos.find(s => s.id === id)
    if (!servico) return null
    
    return {
      ...servico,
      barbeiros: mockBarbeiros.filter(b => servico.barbeiroIds.includes(b.id))
    }
  }

  static async criarServico(
    barbeariaId: string, 
    data: CriarServicoData
  ): Promise<Servico> {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const novoServico: Servico = {
      id: Math.random().toString(36).substr(2, 9),
      barbeariaId,
      ...data,
      status: 'ativo',
      criadoEm: new Date(),
      atualizadoEm: new Date()
    }
    
    mockServicos.push(novoServico)
    return novoServico
  }

  static async atualizarServico(
    id: string, 
    data: AtualizarServicoData
  ): Promise<Servico> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const index = mockServicos.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Serviço não encontrado')
    }
    
    const servicoAtualizado: Servico = {
      ...mockServicos[index],
      ...data,
      atualizadoEm: new Date()
    }
    
    mockServicos[index] = servicoAtualizado
    return servicoAtualizado
  }

  static async alterarStatusServico(
    id: string, 
    status: StatusServico
  ): Promise<Servico> {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const index = mockServicos.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Serviço não encontrado')
    }
    
    mockServicos[index] = {
      ...mockServicos[index],
      status,
      atualizadoEm: new Date()
    }
    
    return mockServicos[index]
  }

  static async excluirServico(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = mockServicos.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Serviço não encontrado')
    }
    
    mockServicos.splice(index, 1)
  }

  static async listarBarbeiros(barbeariaId: string): Promise<{ id: string; nome: string }[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    // Em uma implementação real, isso viria da API de funcionários
    return mockBarbeiros
  }

  static async obterEstatisticasServicos(barbeariaId: string) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const servicos = mockServicos.filter(s => s.barbeariaId === barbeariaId)
    
    return {
      totalServicos: servicos.length,
      servicosAtivos: servicos.filter(s => s.status === 'ativo').length,
      precoMedio: servicos.reduce((acc, s) => acc + s.preco, 0) / servicos.length,
      duracaoMedia: servicos.reduce((acc, s) => acc + s.duracao, 0) / servicos.length,
      servicosPorCategoria: {
        corte: servicos.filter(s => s.categoria === 'corte').length,
        barba: servicos.filter(s => s.categoria === 'barba').length,
        combo: servicos.filter(s => s.categoria === 'combo').length,
        outros: servicos.filter(s => s.categoria === 'outros').length
      }
    }
  }
}