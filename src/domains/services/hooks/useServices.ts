import { useState, useEffect } from 'react'
import { 
  Servico, 
  CriarServicoData, 
  AtualizarServicoData, 
  FiltrosServicos,
  ServicoComBarbeiros,
  StatusServico
} from '../types/service'
import { ServiceService } from '../services/service.service'

export function useServices(barbeariaId: string) {
  const [servicos, setServicos] = useState<ServicoComBarbeiros[]>([])
  const [barbeiros, setBarbeiros] = useState<{ id: string; nome: string }[]>([])
  const [estatisticas, setEstatisticas] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtros, setFiltros] = useState<FiltrosServicos>({})

  // Carregar serviços
  const carregarServicos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ServiceService.listarServicos(barbeariaId, filtros)
      setServicos(data)
    } catch (err) {
      setError('Erro ao carregar serviços')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Carregar barbeiros
  const carregarBarbeiros = async () => {
    try {
      const data = await ServiceService.listarBarbeiros(barbeariaId)
      setBarbeiros(data)
    } catch (err) {
      console.error('Erro ao carregar barbeiros:', err)
    }
  }

  // Carregar estatísticas
  const carregarEstatisticas = async () => {
    try {
      const data = await ServiceService.obterEstatisticasServicos(barbeariaId)
      setEstatisticas(data)
    } catch (err) {
      console.error('Erro ao carregar estatísticas:', err)
    }
  }

  // Criar serviço
  const criarServico = async (data: CriarServicoData) => {
    try {
      setError(null)
      const novoServico = await ServiceService.criarServico(barbeariaId, data)
      await carregarServicos() // Recarregar lista
      await carregarEstatisticas() // Atualizar estatísticas
      return novoServico
    } catch (err) {
      setError('Erro ao criar serviço')
      throw err
    }
  }

  // Atualizar serviço
  const atualizarServico = async (id: string, data: AtualizarServicoData) => {
    try {
      setError(null)
      const servicoAtualizado = await ServiceService.atualizarServico(id, data)
      setServicos(prev => 
        prev.map(s => s.id === id ? { ...servicoAtualizado, barbeiros: s.barbeiros } : s)
      )
      await carregarEstatisticas()
      return servicoAtualizado
    } catch (err) {
      setError('Erro ao atualizar serviço')
      throw err
    }
  }

  // Alterar status do serviço
  const alterarStatus = async (id: string, status: StatusServico) => {
    try {
      setError(null)
      const servicoAtualizado = await ServiceService.alterarStatusServico(id, status)
      setServicos(prev => 
        prev.map(s => s.id === id ? { ...servicoAtualizado, barbeiros: s.barbeiros } : s)
      )
      await carregarEstatisticas()
      return servicoAtualizado
    } catch (err) {
      setError('Erro ao alterar status do serviço')
      throw err
    }
  }

  // Excluir serviço
  const excluirServico = async (id: string) => {
    try {
      setError(null)
      await ServiceService.excluirServico(id)
      setServicos(prev => prev.filter(s => s.id !== id))
      await carregarEstatisticas()
    } catch (err) {
      setError('Erro ao excluir serviço')
      throw err
    }
  }

  // Aplicar filtros
  const aplicarFiltros = (novosFiltros: FiltrosServicos) => {
    setFiltros(novosFiltros)
  }

  // Limpar filtros
  const limparFiltros = () => {
    setFiltros({})
  }

  // Efeitos
  useEffect(() => {
    carregarServicos()
  }, [barbeariaId, filtros])

  useEffect(() => {
    carregarBarbeiros()
    carregarEstatisticas()
  }, [barbeariaId])

  return {
    servicos,
    barbeiros,
    estatisticas,
    loading,
    error,
    filtros,
    criarServico,
    atualizarServico,
    alterarStatus,
    excluirServico,
    aplicarFiltros,
    limparFiltros,
    recarregar: carregarServicos
  }
}