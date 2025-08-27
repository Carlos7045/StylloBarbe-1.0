import { 
  Funcionario, 
  CriarFuncionarioData, 
  AtualizarFuncionarioData, 
  FiltrosFuncionarios,
  Especialidade,
  StatusFuncionario
} from '../types/staff'

// Mock data para desenvolvimento
const mockEspecialidades: Especialidade[] = [
  { id: '1', nome: 'Corte Masculino', descricao: 'Especialista em cortes masculinos' },
  { id: '2', nome: 'Barba', descricao: 'Especialista em barba e bigode' },
  { id: '3', nome: 'Corte Infantil', descricao: 'Especialista em cortes infantis' },
  { id: '4', nome: 'Corte Social', descricao: 'Cortes sociais e executivos' },
  { id: '5', nome: 'Degradê', descricao: 'Especialista em degradês' }
]

const mockFuncionarios: Funcionario[] = [
  {
    id: '1',
    barbeariaId: 'barbearia-1',
    nome: 'João Silva',
    email: 'joao@styllobarber.com',
    telefone: '(11) 99999-9999',
    tipo: 'barbeiro',
    status: 'ativo',
    especialidades: [mockEspecialidades[0], mockEspecialidades[1]],
    horarios: [
      { diaSemana: 1, horaInicio: '08:00', horaFim: '18:00', ativo: true },
      { diaSemana: 2, horaInicio: '08:00', horaFim: '18:00', ativo: true },
      { diaSemana: 3, horaInicio: '08:00', horaFim: '18:00', ativo: true },
      { diaSemana: 4, horaInicio: '08:00', horaFim: '18:00', ativo: true },
      { diaSemana: 5, horaInicio: '08:00', horaFim: '18:00', ativo: true },
      { diaSemana: 6, horaInicio: '08:00', horaFim: '16:00', ativo: true }
    ],
    dataAdmissao: new Date('2024-01-15'),
    criadoEm: new Date('2024-01-15'),
    atualizadoEm: new Date('2024-01-15')
  },
  {
    id: '2',
    barbeariaId: 'barbearia-1',
    nome: 'Maria Santos',
    email: 'maria@styllobarber.com',
    telefone: '(11) 88888-8888',
    tipo: 'recepcionista',
    status: 'ativo',
    especialidades: [],
    horarios: [
      { diaSemana: 1, horaInicio: '07:30', horaFim: '17:30', ativo: true },
      { diaSemana: 2, horaInicio: '07:30', horaFim: '17:30', ativo: true },
      { diaSemana: 3, horaInicio: '07:30', horaFim: '17:30', ativo: true },
      { diaSemana: 4, horaInicio: '07:30', horaFim: '17:30', ativo: true },
      { diaSemana: 5, horaInicio: '07:30', horaFim: '17:30', ativo: true }
    ],
    dataAdmissao: new Date('2024-02-01'),
    criadoEm: new Date('2024-02-01'),
    atualizadoEm: new Date('2024-02-01')
  }
]

export class StaffService {
  static async listarFuncionarios(
    barbeariaId: string, 
    filtros?: FiltrosFuncionarios
  ): Promise<Funcionario[]> {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let funcionarios = mockFuncionarios.filter(f => f.barbeariaId === barbeariaId)
    
    if (filtros) {
      if (filtros.tipo) {
        funcionarios = funcionarios.filter(f => f.tipo === filtros.tipo)
      }
      if (filtros.status) {
        funcionarios = funcionarios.filter(f => f.status === filtros.status)
      }
      if (filtros.especialidade) {
        funcionarios = funcionarios.filter(f => 
          f.especialidades.some(e => e.id === filtros.especialidade)
        )
      }
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase()
        funcionarios = funcionarios.filter(f => 
          f.nome.toLowerCase().includes(busca) ||
          f.email.toLowerCase().includes(busca) ||
          f.telefone.includes(busca)
        )
      }
    }
    
    return funcionarios
  }

  static async obterFuncionario(id: string): Promise<Funcionario | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockFuncionarios.find(f => f.id === id) || null
  }

  static async criarFuncionario(
    barbeariaId: string, 
    data: CriarFuncionarioData
  ): Promise<Funcionario> {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const especialidades = mockEspecialidades.filter(e => 
      data.especialidades.includes(e.id)
    )
    
    const novoFuncionario: Funcionario = {
      id: Math.random().toString(36).substr(2, 9),
      barbeariaId,
      ...data,
      especialidades,
      horarios: data.horarios.map(h => ({ ...h, ativo: true })),
      status: 'ativo',
      dataAdmissao: new Date(),
      criadoEm: new Date(),
      atualizadoEm: new Date()
    }
    
    mockFuncionarios.push(novoFuncionario)
    return novoFuncionario
  }

  static async atualizarFuncionario(
    id: string, 
    data: AtualizarFuncionarioData
  ): Promise<Funcionario> {
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const index = mockFuncionarios.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('Funcionário não encontrado')
    }
    
    const funcionario = mockFuncionarios[index]
    const especialidades = data.especialidades 
      ? mockEspecialidades.filter(e => data.especialidades!.includes(e.id))
      : funcionario.especialidades
    
    const funcionarioAtualizado: Funcionario = {
      ...funcionario,
      ...data,
      especialidades,
      horarios: data.horarios 
        ? data.horarios.map(h => ({ ...h, ativo: true }))
        : funcionario.horarios,
      atualizadoEm: new Date()
    }
    
    mockFuncionarios[index] = funcionarioAtualizado
    return funcionarioAtualizado
  }

  static async alterarStatusFuncionario(
    id: string, 
    status: StatusFuncionario
  ): Promise<Funcionario> {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const index = mockFuncionarios.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('Funcionário não encontrado')
    }
    
    mockFuncionarios[index] = {
      ...mockFuncionarios[index],
      status,
      atualizadoEm: new Date()
    }
    
    return mockFuncionarios[index]
  }

  static async listarEspecialidades(): Promise<Especialidade[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockEspecialidades
  }

  static async excluirFuncionario(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const index = mockFuncionarios.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('Funcionário não encontrado')
    }
    
    mockFuncionarios.splice(index, 1)
  }
}