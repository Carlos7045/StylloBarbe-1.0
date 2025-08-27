'use client'

import { useState, useEffect } from 'react'
import { BarbeiroDashboardService } from '../services/barbeiro-dashboard.service'
import { 
  MetricasBarbeiro, 
  AgendamentoBarbeiro, 
  HistoricoCliente, 
  NotificacaoBarbeiro,
  PerformanceBarbeiro 
} from '../types/barbeiro-dashboard'

export function useBarbeiroMetrics(barbeiroId: string) {
  const [metricas, setMetricas] = useState<MetricasBarbeiro | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        setLoading(true)
        const data = await BarbeiroDashboardService.getMetricasBarbeiro(barbeiroId)
        setMetricas(data)
      } catch (err) {
        setError('Erro ao carregar métricas do barbeiro')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeiroId) {
      fetchMetricas()
    }
  }, [barbeiroId])

  return { metricas, loading, error }
}

export function useBarbeiroAgendamentos(barbeiroId: string) {
  const [agendamentos, setAgendamentos] = useState<AgendamentoBarbeiro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        setLoading(true)
        const data = await BarbeiroDashboardService.getAgendamentosBarbeiro(barbeiroId)
        setAgendamentos(data)
      } catch (err) {
        setError('Erro ao carregar agendamentos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeiroId) {
      fetchAgendamentos()
    }
  }, [barbeiroId])

  const updateStatus = async (agendamentoId: string, status: AgendamentoBarbeiro['status']) => {
    try {
      await BarbeiroDashboardService.updateAgendamentoStatus(agendamentoId, status)
      setAgendamentos(prev => 
        prev.map(agendamento => 
          agendamento.id === agendamentoId 
            ? { ...agendamento, status }
            : agendamento
        )
      )
    } catch (err) {
      setError('Erro ao atualizar status do agendamento')
      console.error(err)
    }
  }

  return { agendamentos, loading, error, updateStatus }
}

export function useBarbeiroClientes(barbeiroId: string) {
  const [clientes, setClientes] = useState<HistoricoCliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true)
        const data = await BarbeiroDashboardService.getHistoricoClientes(barbeiroId)
        setClientes(data)
      } catch (err) {
        setError('Erro ao carregar histórico de clientes')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeiroId) {
      fetchClientes()
    }
  }, [barbeiroId])

  return { clientes, loading, error }
}

export function useBarbeiroNotificacoes(barbeiroId: string) {
  const [notificacoes, setNotificacoes] = useState<NotificacaoBarbeiro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        setLoading(true)
        const data = await BarbeiroDashboardService.getNotificacoes(barbeiroId)
        setNotificacoes(data)
      } catch (err) {
        setError('Erro ao carregar notificações')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeiroId) {
      fetchNotificacoes()
    }
  }, [barbeiroId])

  const marcarComoLida = async (notificacaoId: string) => {
    try {
      await BarbeiroDashboardService.marcarNotificacaoLida(notificacaoId)
      setNotificacoes(prev => 
        prev.map(notificacao => 
          notificacao.id === notificacaoId 
            ? { ...notificacao, lida: true }
            : notificacao
        )
      )
    } catch (err) {
      setError('Erro ao marcar notificação como lida')
      console.error(err)
    }
  }

  return { notificacoes, loading, error, marcarComoLida }
}

export function useBarbeiroPerformance(barbeiroId: string) {
  const [performance, setPerformance] = useState<PerformanceBarbeiro[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true)
        const data = await BarbeiroDashboardService.getPerformance(barbeiroId)
        setPerformance(data)
      } catch (err) {
        setError('Erro ao carregar dados de performance')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeiroId) {
      fetchPerformance()
    }
  }, [barbeiroId])

  return { performance, loading, error }
}