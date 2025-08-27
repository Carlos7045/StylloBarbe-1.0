import { useState, useEffect } from 'react'
import { 
  ConfiguracaoHorarios,
  HorarioFuncionamento,
  IntervaloTrabalho,
  BloqueioTemporario,
  ConfiguracaoAgendamento,
  CriarBloqueioData,
  AtualizarBloqueioData
} from '../types/schedule'
import { ScheduleService } from '../services/schedule.service'

export function useScheduleSettings(barbeariaId: string) {
  const [configuracao, setConfiguracao] = useState<ConfiguracaoHorarios | null>(null)
  const [barbeiros, setBarbeiros] = useState<{ id: string; nome: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar configuração
  const carregarConfiguracao = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await ScheduleService.obterConfiguracaoHorarios(barbeariaId)
      setConfiguracao(data)
    } catch (err) {
      setError('Erro ao carregar configuração de horários')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Carregar barbeiros
  const carregarBarbeiros = async () => {
    try {
      const data = await ScheduleService.listarBarbeiros(barbeariaId)
      setBarbeiros(data)
    } catch (err) {
      console.error('Erro ao carregar barbeiros:', err)
    }
  }

  // Atualizar horários de funcionamento
  const atualizarHorariosFuncionamento = async (horarios: HorarioFuncionamento[]) => {
    try {
      setError(null)
      const configuracaoAtualizada = await ScheduleService.atualizarHorariosFuncionamento(
        barbeariaId, 
        horarios
      )
      setConfiguracao(configuracaoAtualizada)
      return configuracaoAtualizada
    } catch (err) {
      setError('Erro ao atualizar horários de funcionamento')
      throw err
    }
  }

  // Atualizar intervalos
  const atualizarIntervalos = async (intervalos: IntervaloTrabalho[]) => {
    try {
      setError(null)
      const configuracaoAtualizada = await ScheduleService.atualizarIntervalos(
        barbeariaId, 
        intervalos
      )
      setConfiguracao(configuracaoAtualizada)
      return configuracaoAtualizada
    } catch (err) {
      setError('Erro ao atualizar intervalos')
      throw err
    }
  }

  // Atualizar configuração de agendamento
  const atualizarConfiguracaoAgendamento = async (config: ConfiguracaoAgendamento) => {
    try {
      setError(null)
      const configuracaoAtualizada = await ScheduleService.atualizarConfiguracaoAgendamento(
        barbeariaId, 
        config
      )
      setConfiguracao(configuracaoAtualizada)
      return configuracaoAtualizada
    } catch (err) {
      setError('Erro ao atualizar configuração de agendamento')
      throw err
    }
  }

  // Criar bloqueio
  const criarBloqueio = async (data: CriarBloqueioData) => {
    try {
      setError(null)
      const novoBloqueio = await ScheduleService.criarBloqueio(barbeariaId, data)
      
      if (configuracao) {
        setConfiguracao({
          ...configuracao,
          bloqueios: [...configuracao.bloqueios, novoBloqueio],
          atualizadoEm: new Date()
        })
      }
      
      return novoBloqueio
    } catch (err) {
      setError('Erro ao criar bloqueio')
      throw err
    }
  }

  // Atualizar bloqueio
  const atualizarBloqueio = async (id: string, data: AtualizarBloqueioData) => {
    try {
      setError(null)
      const bloqueioAtualizado = await ScheduleService.atualizarBloqueio(id, data)
      
      if (configuracao) {
        setConfiguracao({
          ...configuracao,
          bloqueios: configuracao.bloqueios.map(b => 
            b.id === id ? bloqueioAtualizado : b
          ),
          atualizadoEm: new Date()
        })
      }
      
      return bloqueioAtualizado
    } catch (err) {
      setError('Erro ao atualizar bloqueio')
      throw err
    }
  }

  // Excluir bloqueio
  const excluirBloqueio = async (id: string) => {
    try {
      setError(null)
      await ScheduleService.excluirBloqueio(id)
      
      if (configuracao) {
        setConfiguracao({
          ...configuracao,
          bloqueios: configuracao.bloqueios.filter(b => b.id !== id),
          atualizadoEm: new Date()
        })
      }
    } catch (err) {
      setError('Erro ao excluir bloqueio')
      throw err
    }
  }

  // Verificar disponibilidade
  const verificarDisponibilidade = async (
    data: Date,
    horaInicio: string,
    horaFim: string,
    barbeiroId?: string
  ) => {
    try {
      return await ScheduleService.verificarDisponibilidade(
        barbeariaId,
        data,
        horaInicio,
        horaFim,
        barbeiroId
      )
    } catch (err) {
      console.error('Erro ao verificar disponibilidade:', err)
      return false
    }
  }

  // Efeitos
  useEffect(() => {
    carregarConfiguracao()
    carregarBarbeiros()
  }, [barbeariaId])

  return {
    configuracao,
    barbeiros,
    loading,
    error,
    atualizarHorariosFuncionamento,
    atualizarIntervalos,
    atualizarConfiguracaoAgendamento,
    criarBloqueio,
    atualizarBloqueio,
    excluirBloqueio,
    verificarDisponibilidade,
    recarregar: carregarConfiguracao
  }
}