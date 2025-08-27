'use client'

import { useState, useEffect } from 'react'
import { AdminBarbeariaService } from '../services/admin-dashboard.service'
import { 
  MetricasBarbearia, 
  AgendamentoResumo, 
  BarbeiroResumo, 
  AlertaBarbearia,
  PerformanceBarbearia 
} from '../types/admin-dashboard'

export function useAdminBarbeariaMetrics(barbeariaId: string) {
  const [metricas, setMetricas] = useState<MetricasBarbearia | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        setLoading(true)
        const data = await AdminBarbeariaService.getMetricasBarbearia(barbeariaId)
        setMetricas(data)
      } catch (err) {
        setError('Erro ao carregar métricas da barbearia')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeariaId) {
      fetchMetricas()
    }
  }, [barbeariaId])

  return { metricas, loading, error }
}

export function useAdminBarbeariaAgendamentos(barbeariaId: string) {
  const [agendamentos, setAgendamentos] = useState<AgendamentoResumo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        setLoading(true)
        const data = await AdminBarbeariaService.getAgendamentosHoje(barbeariaId)
        setAgendamentos(data)
      } catch (err) {
        setError('Erro ao carregar agendamentos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeariaId) {
      fetchAgendamentos()
    }
  }, [barbeariaId])

  const updateStatus = async (agendamentoId: string, status: AgendamentoResumo['status']) => {
    try {
      await AdminBarbeariaService.updateAgendamentoStatus(agendamentoId, status)
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

export function useAdminBarbeariaBarbeiros(barbeariaId: string) {
  const [barbeiros, setBarbeiros] = useState<BarbeiroResumo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBarbeiros = async () => {
      try {
        setLoading(true)
        const data = await AdminBarbeariaService.getBarbeiros(barbeariaId)
        setBarbeiros(data)
      } catch (err) {
        setError('Erro ao carregar barbeiros')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeariaId) {
      fetchBarbeiros()
    }
  }, [barbeariaId])

  return { barbeiros, loading, error }
}

export function useAdminBarbeariaAlertas(barbeariaId: string) {
  const [alertas, setAlertas] = useState<AlertaBarbearia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        setLoading(true)
        const data = await AdminBarbeariaService.getAlertas(barbeariaId)
        setAlertas(data)
      } catch (err) {
        setError('Erro ao carregar alertas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeariaId) {
      fetchAlertas()
    }
  }, [barbeariaId])

  return { alertas, loading, error }
}

export function useAdminBarbeariaPerformance(barbeariaId: string) {
  const [performance, setPerformance] = useState<PerformanceBarbearia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true)
        const data = await AdminBarbeariaService.getPerformance(barbeariaId)
        setPerformance(data)
      } catch (err) {
        setError('Erro ao carregar dados de performance')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (barbeariaId) {
      fetchPerformance()
    }
  }, [barbeariaId])

  return { performance, loading, error }
}