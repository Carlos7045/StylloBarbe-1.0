import { useState, useCallback } from 'react'
import { 
  Barbearia, 
  ServicoBooking, 
  BarbeiroBooking, 
  SelecaoAgendamento,
  FiltrosBarbearia,
  FiltrosServico,
  FiltrosBarbeiro
} from '../types/booking'
import { BookingService } from '../services/booking.service'

interface UseBookingReturn {
  // Estado da seleção
  selecao: SelecaoAgendamento
  
  // Dados carregados
  barbearias: Barbearia[]
  servicos: ServicoBooking[]
  barbeiros: BarbeiroBooking[]
  
  // Estados de loading
  loadingBarbearias: boolean
  loadingServicos: boolean
  loadingBarbeiros: boolean
  
  // Erros
  erro: string | null
  
  // Ações
  selecionarBarbearia: (barbearia: Barbearia) => void
  selecionarServico: (servico: ServicoBooking) => void
  selecionarBarbeiro: (barbeiro: BarbeiroBooking | 'qualquer') => void
  selecionarDataHora: (dataHora: Date) => void
  adicionarObservacoes: (observacoes: string) => void
  limparSelecao: () => void
  voltarEtapa: () => void
  
  // Carregamento de dados
  carregarBarbearias: (filtros?: FiltrosBarbearia) => Promise<void>
  carregarServicos: (barbeariaId: string, filtros?: FiltrosServico) => Promise<void>
  carregarBarbeiros: (barbeariaId: string, servicoId?: string, filtros?: FiltrosBarbeiro) => Promise<void>
  
  // Utilitários
  obterEtapaAtual: () => 'barbearia' | 'servico' | 'barbeiro' | 'horario' | 'confirmacao'
  podeAvancar: () => boolean
  obterResumo: () => {
    valorTotal: number
    tempoEstimado: number
    itens: string[]
  }
}

export function useBooking(): UseBookingReturn {
  const [selecao, setSelecao] = useState<SelecaoAgendamento>({})
  const [barbearias, setBarbearias] = useState<Barbearia[]>([])
  const [servicos, setServicos] = useState<ServicoBooking[]>([])
  const [barbeiros, setBarbeiros] = useState<BarbeiroBooking[]>([])
  
  const [loadingBarbearias, setLoadingBarbearias] = useState(false)
  const [loadingServicos, setLoadingServicos] = useState(false)
  const [loadingBarbeiros, setLoadingBarbeiros] = useState(false)
  
  const [erro, setErro] = useState<string | null>(null)

  const selecionarBarbearia = useCallback((barbearia: Barbearia) => {
    setSelecao(prev => ({
      barbearia,
      // Limpar seleções posteriores
      servico: undefined,
      barbeiro: undefined,
      dataHora: undefined,
      observacoes: prev.observacoes
    }))
    setServicos([])
    setBarbeiros([])
  }, [])

  const selecionarServico = useCallback((servico: ServicoBooking) => {
    setSelecao(prev => ({
      ...prev,
      servico,
      // Limpar seleções posteriores
      barbeiro: undefined,
      dataHora: undefined
    }))
    setBarbeiros([])
  }, [])

  const selecionarBarbeiro = useCallback((barbeiro: BarbeiroBooking | 'qualquer') => {
    setSelecao(prev => ({
      ...prev,
      barbeiro,
      // Limpar seleções posteriores
      dataHora: undefined
    }))
  }, [])

  const selecionarDataHora = useCallback((dataHora: Date) => {
    setSelecao(prev => ({
      ...prev,
      dataHora
    }))
  }, [])

  const adicionarObservacoes = useCallback((observacoes: string) => {
    setSelecao(prev => ({
      ...prev,
      observacoes
    }))
  }, [])

  const limparSelecao = useCallback(() => {
    setSelecao({})
    setBarbearias([])
    setServicos([])
    setBarbeiros([])
    setErro(null)
  }, [])

  const voltarEtapa = useCallback(() => {
    const etapaAtual = obterEtapaAtual()
    
    switch (etapaAtual) {
      case 'servico':
        setSelecao(prev => ({ barbearia: prev.barbearia }))
        setServicos([])
        setBarbeiros([])
        break
      case 'barbeiro':
        setSelecao(prev => ({ 
          barbearia: prev.barbearia, 
          servico: prev.servico 
        }))
        setBarbeiros([])
        break
      case 'horario':
        setSelecao(prev => ({ 
          barbearia: prev.barbearia, 
          servico: prev.servico,
          barbeiro: prev.barbeiro
        }))
        break
      case 'confirmacao':
        setSelecao(prev => ({ 
          barbearia: prev.barbearia, 
          servico: prev.servico,
          barbeiro: prev.barbeiro
        }))
        break
    }
  }, [])

  const carregarBarbearias = useCallback(async (filtros?: FiltrosBarbearia) => {
    try {
      setLoadingBarbearias(true)
      setErro(null)
      const dados = await BookingService.listarBarbearias(filtros)
      setBarbearias(dados)
    } catch (error) {
      setErro('Erro ao carregar barbearias. Tente novamente.')
      console.error('Erro ao carregar barbearias:', error)
    } finally {
      setLoadingBarbearias(false)
    }
  }, [])

  const carregarServicos = useCallback(async (
    barbeariaId: string, 
    filtros?: FiltrosServico
  ) => {
    try {
      setLoadingServicos(true)
      setErro(null)
      const dados = await BookingService.listarServicosBarbearia(barbeariaId, filtros)
      setServicos(dados)
    } catch (error) {
      setErro('Erro ao carregar serviços. Tente novamente.')
      console.error('Erro ao carregar serviços:', error)
    } finally {
      setLoadingServicos(false)
    }
  }, [])

  const carregarBarbeiros = useCallback(async (
    barbeariaId: string,
    servicoId?: string,
    filtros?: FiltrosBarbeiro
  ) => {
    try {
      setLoadingBarbeiros(true)
      setErro(null)
      const dados = await BookingService.listarBarbeirosBarbearia(
        barbeariaId, 
        servicoId, 
        filtros
      )
      setBarbeiros(dados)
    } catch (error) {
      setErro('Erro ao carregar barbeiros. Tente novamente.')
      console.error('Erro ao carregar barbeiros:', error)
    } finally {
      setLoadingBarbeiros(false)
    }
  }, [])

  const obterEtapaAtual = useCallback((): 'barbearia' | 'servico' | 'barbeiro' | 'horario' | 'confirmacao' => {
    if (!selecao.barbearia) return 'barbearia'
    if (!selecao.servico) return 'servico'
    if (!selecao.barbeiro) return 'barbeiro'
    if (!selecao.dataHora) return 'horario'
    return 'confirmacao'
  }, [selecao])

  const podeAvancar = useCallback(() => {
    const etapa = obterEtapaAtual()
    
    switch (etapa) {
      case 'barbearia':
        return !!selecao.barbearia
      case 'servico':
        return !!selecao.servico
      case 'barbeiro':
        return !!selecao.barbeiro
      case 'horario':
        return !!selecao.dataHora
      case 'confirmacao':
        return true
      default:
        return false
    }
  }, [selecao, obterEtapaAtual])

  const obterResumo = useCallback(() => {
    const valorTotal = selecao.servico?.preco || 0
    const tempoEstimado = selecao.servico?.duracao || 0
    
    const itens: string[] = []
    if (selecao.barbearia) itens.push(selecao.barbearia.nome)
    if (selecao.servico) itens.push(selecao.servico.nome)
    if (selecao.barbeiro && selecao.barbeiro !== 'qualquer') {
      itens.push(`Barbeiro: ${selecao.barbeiro.nome}`)
    } else if (selecao.barbeiro === 'qualquer') {
      itens.push('Qualquer barbeiro disponível')
    }
    if (selecao.dataHora) {
      itens.push(selecao.dataHora.toLocaleString('pt-BR'))
    }
    
    return { valorTotal, tempoEstimado, itens }
  }, [selecao])

  return {
    selecao,
    barbearias,
    servicos,
    barbeiros,
    loadingBarbearias,
    loadingServicos,
    loadingBarbeiros,
    erro,
    selecionarBarbearia,
    selecionarServico,
    selecionarBarbeiro,
    selecionarDataHora,
    adicionarObservacoes,
    limparSelecao,
    voltarEtapa,
    carregarBarbearias,
    carregarServicos,
    carregarBarbeiros,
    obterEtapaAtual,
    podeAvancar,
    obterResumo
  }
}