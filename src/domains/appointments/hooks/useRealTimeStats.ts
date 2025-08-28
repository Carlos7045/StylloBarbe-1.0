'use client'

import { useState, useEffect } from 'react'
import { AppointmentsService } from '../services/appointments.service'

export interface BarberOccupancyRate {
  barbeiroId: string
  nomeCompleto: string
  avatar?: string
  totalSlots: number
  occupiedSlots: number
  occupancyRate: number
  revenue: number
}

export interface DayRevenue {
  date: string
  revenue: number
  appointments: number
}

export interface WeekRevenue {
  week: string
  revenue: number
  appointments: number
}

export interface PendingAlert {
  id: string
  type: 'confirmation_needed' | 'payment_pending' | 'conflict_detected'
  message: string
  agendamentoId: string
  priority: 'high' | 'medium' | 'low'
  createdAt: Date
}

export interface RealTimeStats {
  barberOccupancy: BarberOccupancyRate[]
  todayRevenue: number
  weekRevenue: number
  monthRevenue: number
  dailyRevenue: DayRevenue[]
  weeklyRevenue: WeekRevenue[]
  pendingAlerts: PendingAlert[]
  totalAppointmentsToday: number
  completedAppointmentsToday: number
  canceledAppointmentsToday: number
  isLoading: boolean
  error: string | null
}

export function useRealTimeStats(barbeariaId: string) {
  const [stats, setStats] = useState<RealTimeStats>({
    barberOccupancy: [],
    todayRevenue: 0,
    weekRevenue: 0,
    monthRevenue: 0,
    dailyRevenue: [],
    weeklyRevenue: [],
    pendingAlerts: [],
    totalAppointmentsToday: 0,
    completedAppointmentsToday: 0,
    canceledAppointmentsToday: 0,
    isLoading: true,
    error: null
  })

  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)

  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, isLoading: true, error: null }))

      // Buscar estatísticas em paralelo
      const [
        occupancyData,
        revenueData,
        alertsData,
        appointmentsData
      ] = await Promise.all([
        AppointmentsService.getBarberOccupancyRates(barbeariaId),
        AppointmentsService.getRevenueStats(barbeariaId),
        AppointmentsService.getPendingAlerts(barbeariaId),
        AppointmentsService.getTodayAppointmentStats(barbeariaId)
      ])

      setStats({
        barberOccupancy: occupancyData,
        todayRevenue: revenueData.today,
        weekRevenue: revenueData.week,
        monthRevenue: revenueData.month,
        dailyRevenue: revenueData.daily,
        weeklyRevenue: revenueData.weekly,
        pendingAlerts: alertsData,
        totalAppointmentsToday: appointmentsData.total,
        completedAppointmentsToday: appointmentsData.completed,
        canceledAppointmentsToday: appointmentsData.canceled,
        isLoading: false,
        error: null
      })
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
      setStats(prev => ({
        ...prev,
        isLoading: false,
        error: 'Erro ao carregar estatísticas'
      }))
    }
  }

  const startRealTimeUpdates = () => {
    // Atualizar a cada 30 segundos
    const interval = setInterval(fetchStats, 30000)
    setRefreshInterval(interval)
    return interval
  }

  const stopRealTimeUpdates = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      setRefreshInterval(null)
    }
  }

  const refreshStats = () => {
    fetchStats()
  }

  useEffect(() => {
    if (barbeariaId) {
      fetchStats()
      const interval = startRealTimeUpdates()

      return () => {
        clearInterval(interval)
      }
    }
  }, [barbeariaId])

  return {
    ...stats,
    refreshStats,
    startRealTimeUpdates,
    stopRealTimeUpdates
  }
}