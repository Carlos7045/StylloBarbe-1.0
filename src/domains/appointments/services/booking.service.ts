import { 
  Barbearia, 
  ServicoBooking, 
  BarbeiroBooking, 
  FiltrosBarbearia,
  FiltrosServico,
  FiltrosBarbeiro
} from '../types/booking'

// Mock data para desenvolvimento
const mockBarbearias: Barbearia[] = [
  {
    id: 'barbearia-1',
    nome: 'Styllo Barber Premium - Centro',
    endereco: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    telefone: '(11) 99999-9999',
    email: 'centro@styllobarber.com',
    logo: '/images/barbershop-1.jpg',
    ativa: true,
    avaliacao: 4.8,
    totalAvaliacoes: 127,
    distancia: 2.5,
    tempoEstimado: 15,
    redeId: 'rede-styllo',
    adminId: 'admin-styllo-1'
  },
  {
    id: 'barbearia-2',
    nome: 'Styllo Barber Premium - Paulista',
    endereco: 'Av. Paulista, 456 - Bela Vista, São Paulo - SP',
    telefone: '(11) 88888-8888',
    email: 'paulista@styllobarber.com',
    ativa: true,
    avaliacao: 4.6,
    totalAvaliacoes: 89,
    distancia: 5.2,
    tempoEstimado: 25,
    redeId: 'rede-styllo',
    adminId: 'admin-styllo-1'
  },
  {
    id: 'barbearia-3',
    nome: 'Styllo Barber Premium - Augusta',
    endereco: 'Rua Augusta, 789 - Consolação, São Paulo - SP',
    telefone: '(11) 77777-7777',
    email: 'augusta@styllobarber.com',
    ativa: true,
    avaliacao: 4.9,
    totalAvaliacoes: 203,
    distancia: 3.8,
    tempoEstimado: 20,
    redeId: 'rede-styllo',
    adminId: 'admin-styllo-1'
  },
  {
    id: 'barbearia-4',
    nome: 'Modern Cut Studio - Vila Madalena',
    endereco: 'Rua Harmonia, 321 - Vila Madalena, São Paulo - SP',
    telefone: '(11) 66666-6666',
    email: 'contato@moderncut.com',
    ativa: true,
    avaliacao: 4.7,
    totalAvaliacoes: 156,
    distancia: 7.1,
    tempoEstimado: 30,
    redeId: 'rede-modern',
    adminId: 'admin-modern-1'
  }
]

const mockServicos: ServicoBooking[] = [
  {
    id: '1',
    nome: 'Corte Masculino Tradicional',
    descricao: 'Corte clássico masculino com acabamento profissional',
    categoria: 'corte',
    preco: 35.00,
    duracao: 30,
    imagem: '/images/corte-tradicional.jpg',
    barbeiros: []
  },
  {
    id: '2',
    nome: 'Barba Completa',
    descricao: 'Aparar e modelar barba com navalha e produtos premium',
    categoria: 'barba',
    preco: 25.00,
    duracao: 20,
    barbeiros: []
  },
  {
    id: '3',
    nome: 'Combo Corte + Barba',
    descricao: 'Corte completo + barba modelada com desconto especial',
    categoria: 'combo',
    preco: 50.00,
    duracao: 45,
    barbeiros: []
  },
  {
    id: '4',
    nome: 'Corte Degradê',
    descricao: 'Corte moderno com degradê lateral e acabamento detalhado',
    categoria: 'corte',
    preco: 40.00,
    duracao: 35,
    barbeiros: []
  },
  {
    id: '5',
    nome: 'Corte Social',
    descricao: 'Corte executivo para ambiente corporativo',
    categoria: 'corte',
    preco: 45.00,
    duracao: 40,
    barbeiros: []
  },
  {
    id: '6',
    nome: 'Barba + Bigode',
    descricao: 'Modelagem completa de barba e bigode',
    categoria: 'barba',
    preco: 30.00,
    duracao: 25,
    barbeiros: []
  }
]

const mockBarbeiros: BarbeiroBooking[] = [
  {
    id: '1',
    nome: 'João Silva',
    foto: '/images/barbeiro-1.jpg',
    especialidades: ['Corte Masculino', 'Barba', 'Degradê'],
    avaliacao: 4.9,
    totalAvaliacoes: 156,
    disponivel: true
  },
  {
    id: '2',
    nome: 'Pedro Santos',
    foto: '/images/barbeiro-2.jpg',
    especialidades: ['Corte Social', 'Barba', 'Combo'],
    avaliacao: 4.7,
    totalAvaliacoes: 98,
    disponivel: true
  },
  {
    id: '3',
    nome: 'Carlos Oliveira',
    foto: '/images/barbeiro-3.jpg',
    especialidades: ['Degradê', 'Corte Moderno'],
    avaliacao: 4.8,
    totalAvaliacoes: 134,
    disponivel: false
  }
]

export class BookingService {
  static async listarBarbearias(filtros?: FiltrosBarbearia): Promise<Barbearia[]> {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 800))
    
    let barbearias = [...mockBarbearias]
    
    if (filtros) {
      // Filtrar por rede específica (prioridade máxima)
      if (filtros.redeId) {
        barbearias = barbearias.filter(b => b.redeId === filtros.redeId)
      }
      
      // Filtrar por admin específico
      if (filtros.adminId) {
        barbearias = barbearias.filter(b => b.adminId === filtros.adminId)
      }
      
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase()
        barbearias = barbearias.filter(b => 
          b.nome.toLowerCase().includes(busca) ||
          b.endereco.toLowerCase().includes(busca)
        )
      }
      
      if (filtros.distanciaMaxima) {
        barbearias = barbearias.filter(b => 
          (b.distancia || 0) <= filtros.distanciaMaxima!
        )
      }
      
      if (filtros.avaliacaoMinima) {
        barbearias = barbearias.filter(b => 
          (b.avaliacao || 0) >= filtros.avaliacaoMinima!
        )
      }
    }
    
    // Ordenar por distância por padrão
    return barbearias.sort((a, b) => (a.distancia || 0) - (b.distancia || 0))
  }

  static async obterBarbearia(id: string): Promise<Barbearia | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockBarbearias.find(b => b.id === id) || null
  }

  static async listarServicosBarbearia(
    barbeariaId: string, 
    filtros?: FiltrosServico
  ): Promise<ServicoBooking[]> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    let servicos = [...mockServicos]
    
    // Adicionar barbeiros disponíveis para cada serviço
    servicos = servicos.map(servico => ({
      ...servico,
      barbeiros: mockBarbeiros.filter(b => 
        b.especialidades.some(esp => 
          servico.nome.toLowerCase().includes(esp.toLowerCase()) ||
          servico.categoria === 'combo'
        )
      )
    }))
    
    if (filtros) {
      if (filtros.categoria) {
        servicos = servicos.filter(s => s.categoria === filtros.categoria)
      }
      
      if (filtros.precoMin !== undefined) {
        servicos = servicos.filter(s => s.preco >= filtros.precoMin!)
      }
      
      if (filtros.precoMax !== undefined) {
        servicos = servicos.filter(s => s.preco <= filtros.precoMax!)
      }
      
      if (filtros.duracaoMax !== undefined) {
        servicos = servicos.filter(s => s.duracao <= filtros.duracaoMax!)
      }
      
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase()
        servicos = servicos.filter(s => 
          s.nome.toLowerCase().includes(busca) ||
          s.descricao.toLowerCase().includes(busca)
        )
      }
    }
    
    return servicos
  }

  static async listarBarbeirosBarbearia(
    barbeariaId: string,
    servicoId?: string,
    filtros?: FiltrosBarbeiro
  ): Promise<BarbeiroBooking[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    let barbeiros = [...mockBarbeiros]
    
    // Se um serviço específico foi selecionado, filtrar barbeiros que podem realizá-lo
    if (servicoId) {
      const servico = mockServicos.find(s => s.id === servicoId)
      if (servico) {
        barbeiros = barbeiros.filter(b => 
          b.especialidades.some(esp => 
            servico.nome.toLowerCase().includes(esp.toLowerCase()) ||
            servico.categoria === 'combo'
          )
        )
      }
    }
    
    if (filtros) {
      if (filtros.especialidade) {
        barbeiros = barbeiros.filter(b => 
          b.especialidades.some(esp => 
            esp.toLowerCase().includes(filtros.especialidade!.toLowerCase())
          )
        )
      }
      
      if (filtros.avaliacaoMinima) {
        barbeiros = barbeiros.filter(b => 
          (b.avaliacao || 0) >= filtros.avaliacaoMinima!
        )
      }
      
      if (filtros.disponivel !== undefined) {
        barbeiros = barbeiros.filter(b => b.disponivel === filtros.disponivel)
      }
    }
    
    // Ordenar por avaliação
    return barbeiros.sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0))
  }

  static async obterServico(id: string): Promise<ServicoBooking | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const servico = mockServicos.find(s => s.id === id)
    if (!servico) return null
    
    return {
      ...servico,
      barbeiros: mockBarbeiros.filter(b => 
        b.especialidades.some(esp => 
          servico.nome.toLowerCase().includes(esp.toLowerCase()) ||
          servico.categoria === 'combo'
        )
      )
    }
  }

  static async obterBarbeiro(id: string): Promise<BarbeiroBooking | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockBarbeiros.find(b => b.id === id) || null
  }

  static async obterEstatisticasBarbearia(barbeariaId: string) {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      totalServicos: mockServicos.length,
      totalBarbeiros: mockBarbeiros.length,
      precoMedio: mockServicos.reduce((acc, s) => acc + s.preco, 0) / mockServicos.length,
      avaliacaoMedia: 4.8,
      tempoMedioAtendimento: 35
    }
  }
}