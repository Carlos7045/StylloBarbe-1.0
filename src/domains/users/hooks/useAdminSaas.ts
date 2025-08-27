'use client'

import { useState, useEffect } from 'react'
import { AdminSaasService } from '../services/admin-saas.service'
import { MetricasAssinatura, BarbeariaStatus, DadosGrafico, AlertaAdmin } from '../types/admin-saas'

export function useAdminSaasMetrics() {
  const [metricas, setMetricas] = useState<MetricasAssinatura | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        setLoading(true)
        const data = await AdminSaasService.getMetricasAssinatura()
        setMetricas(data)
      } catch (err) {
        setError('Erro ao carregar métricas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMetricas()
  }, [])

  return { metricas, loading, error }
}

export function useAdminSaasBarbearias() {
  const [barbearias, setBarbearias] = useState<BarbeariaStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBarbearias = async () => {
      try {
        setLoading(true)
        const data = await AdminSaasService.getBarbearias()
        setBarbearias(data)
      } catch (err) {
        setError('Erro ao carregar barbearias')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBarbearias()
  }, [])

  const toggleStatus = async (id: string, ativa: boolean) => {
    try {
      await AdminSaasService.toggleBarbeariaStatus(id, ativa)
      setBarbearias(prev => 
        prev.map(b => b.id === id ? { ...b, ativa } : b)
      )
    } catch (err) {
      setError('Erro ao alterar status da barbearia')
      console.error(err)
    }
  }

  return { barbearias, loading, error, toggleStatus }
}

export function useAdminSaasCharts() {
  const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDados = async () => {
      try {
        setLoading(true)
        const data = await AdminSaasService.getDadosGraficoReceita()
        setDadosGrafico(data)
      } catch (err) {
        setError('Erro ao carregar dados dos gráficos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDados()
  }, [])

  return { dadosGrafico, loading, error }
}

export function useAdminSaasAlertas() {
  const [alertas, setAlertas] = useState<AlertaAdmin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        setLoading(true)
        const data = await AdminSaasService.getAlertas()
        setAlertas(data)
      } catch (err) {
        setError('Erro ao carregar alertas')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAlertas()
  }, [])

  const marcarComoLido = (id: string) => {
    setAlertas(prev => 
      prev.map(alerta => 
        alerta.id === id ? { ...alerta, lido: true } : alerta
      )
    )
  }

  return { alertas, loading, error, marcarComoLido }
}