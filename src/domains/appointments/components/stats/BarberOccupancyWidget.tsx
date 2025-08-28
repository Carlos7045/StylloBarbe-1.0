'use client'

import { Users, TrendingUp, Clock } from 'lucide-react'
import { BarberOccupancyRate } from '../../hooks/useRealTimeStats'

interface BarberOccupancyWidgetProps {
  occupancyData: BarberOccupancyRate[]
  isLoading: boolean
}

export function BarberOccupancyWidget({ occupancyData, isLoading }: BarberOccupancyWidgetProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Taxa de Ocupação</h2>
            <p className="text-sm text-gray-400 mt-1">Por barbeiro hoje</p>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-600 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-600 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gray-600 rounded w-12"></div>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (occupancyData.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Taxa de Ocupação</h2>
            <p className="text-sm text-gray-400 mt-1">Por barbeiro hoje</p>
          </div>
        </div>

        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">Nenhum dado de ocupação disponível</p>
          <p className="text-sm text-gray-500">
            Os dados aparecerão quando houver agendamentos
          </p>
        </div>
      </div>
    )
  }

  const getOccupancyColor = (rate: number) => {
    if (rate >= 80) return 'text-green-400'
    if (rate >= 60) return 'text-yellow-400'
    if (rate >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getProgressColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500'
    if (rate >= 60) return 'bg-yellow-500'
    if (rate >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Taxa de Ocupação</h2>
            <p className="text-sm text-gray-400 mt-1">Por barbeiro hoje</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <TrendingUp className="h-4 w-4" />
          <span>Tempo real</span>
        </div>
      </div>

      <div className="space-y-6">
        {occupancyData.map((barber) => (
          <div key={barber.barbeiroId} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {barber.avatar ? (
                  <img
                    src={barber.avatar}
                    alt={barber.nomeCompleto}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {barber.nomeCompleto.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{barber.nomeCompleto}</p>
                  <p className="text-xs text-gray-400">
                    {barber.occupiedSlots}/{barber.totalSlots} slots ocupados
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${getOccupancyColor(barber.occupancyRate)}`}>
                  {barber.occupancyRate.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-400">
                  R$ {barber.revenue.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(barber.occupancyRate)}`}
                style={{ width: `${Math.min(barber.occupancyRate, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Ocupação média:</span>
          <span className="text-white font-medium">
            {occupancyData.length > 0
              ? (occupancyData.reduce((acc, b) => acc + b.occupancyRate, 0) / occupancyData.length).toFixed(1)
              : 0}%
          </span>
        </div>
      </div>
    </div>
  )
}