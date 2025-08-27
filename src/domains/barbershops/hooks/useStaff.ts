import { useState, useEffect } from 'react'
import { 
  Funcionario, 
  CriarFuncionarioData, 
  AtualizarFuncionarioData, 
  FiltrosFuncionarios,
  Especialidade,
  StatusFuncionario
} from '../types/staff'
import { StaffService } from '../services/staff.service'

export function useStaff(barbeariaId: string) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtros, setFiltros] = useState<FiltrosFuncionarios>({})

  // Carregar funcionários
  const carregarFuncionarios = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await StaffService.listarFuncionarios(barbeariaId, filtros)
      setFuncionarios(data)
    } catch (err) {
      setError('Erro ao carregar funcionários')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Carregar especialidades
  const carregarEspecialidades = async () => {
    try {
      const data = await StaffService.listarEspecialidades()
      setEspecialidades(data)
    } catch (err) {
      console.error('Erro ao carregar especialidades:', err)
    }
  }

  // Criar funcionário
  const criarFuncionario = async (data: CriarFuncionarioData) => {
    try {
      setError(null)
      const novoFuncionario = await StaffService.criarFuncionario(barbeariaId, data)
      setFuncionarios(prev => [...prev, novoFuncionario])
      return novoFuncionario
    } catch (err) {
      setError('Erro ao criar funcionário')
      throw err
    }
  }

  // Atualizar funcionário
  const atualizarFuncionario = async (id: string, data: AtualizarFuncionarioData) => {
    try {
      setError(null)
      const funcionarioAtualizado = await StaffService.atualizarFuncionario(id, data)
      setFuncionarios(prev => 
        prev.map(f => f.id === id ? funcionarioAtualizado : f)
      )
      return funcionarioAtualizado
    } catch (err) {
      setError('Erro ao atualizar funcionário')
      throw err
    }
  }

  // Alterar status do funcionário
  const alterarStatus = async (id: string, status: StatusFuncionario) => {
    try {
      setError(null)
      const funcionarioAtualizado = await StaffService.alterarStatusFuncionario(id, status)
      setFuncionarios(prev => 
        prev.map(f => f.id === id ? funcionarioAtualizado : f)
      )
      return funcionarioAtualizado
    } catch (err) {
      setError('Erro ao alterar status do funcionário')
      throw err
    }
  }

  // Excluir funcionário
  const excluirFuncionario = async (id: string) => {
    try {
      setError(null)
      await StaffService.excluirFuncionario(id)
      setFuncionarios(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      setError('Erro ao excluir funcionário')
      throw err
    }
  }

  // Aplicar filtros
  const aplicarFiltros = (novosFiltros: FiltrosFuncionarios) => {
    setFiltros(novosFiltros)
  }

  // Limpar filtros
  const limparFiltros = () => {
    setFiltros({})
  }

  // Efeitos
  useEffect(() => {
    carregarFuncionarios()
  }, [barbeariaId, filtros])

  useEffect(() => {
    carregarEspecialidades()
  }, [])

  return {
    funcionarios,
    especialidades,
    loading,
    error,
    filtros,
    criarFuncionario,
    atualizarFuncionario,
    alterarStatus,
    excluirFuncionario,
    aplicarFiltros,
    limparFiltros,
    recarregar: carregarFuncionarios
  }
}