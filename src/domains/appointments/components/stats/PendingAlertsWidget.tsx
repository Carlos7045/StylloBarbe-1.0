'use client'

import { AlertTriangle, Clock, CreditCard, AlertCircle, CheckCircle, X } from 'lucide-react'
import { PendingAlert } from '../../hooks/useRealTimeStats'

interface PendingAlertsWidgetProps {
  alerts: PendingAlert[]
  isLoading: boolean
  onDismissAlert?: (alertId: string) => void
  onViewAppointment?: (agendamentoId: string) => void
}

export function PendingAlertsWidget({ 
  alerts, 
  isLoading, 
  onDismissAlert, 
  onViewAppointment 
}: PendingAlertsWidgetProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-orange-500/20 rounded">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Alertas Pendentes</h2>
            <p className="text-sm text-gray-400 mt-1">Ações necessárias</p>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse border border-gray-600 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const getAlertIcon = (type: PendingAlert['type']) => {
    switch (type) {
      case 'confirmation_needed':
        return <Clock className="h-5 w-5 text-yellow-400" />
      case 'payment_pending':
        return <CreditCard className="h-5 w-5 text-red-400" />
      case 'conflict_detected':
        return <AlertCircle className="h-5 w-5 text-orange-400" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />
    }
  }

  const getAlertColor = (priority: PendingAlert['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-500/10'
      case 'medium':
        return 'border-yellow-500 bg-yellow-500/10'
      case 'low':
        return 'border-blue-500 bg-blue-500/10'
      default:
        return 'border-gray-600 bg-gray-700/50'
    }
  }

  const getPriorityLabel = (priority: PendingAlert['priority']) => {
    switch (priority) {
      case 'high':
        return 'Alta'
      case 'medium':
        return 'Média'
      case 'low':
        return 'Baixa'
      default:
        return 'Normal'
    }
  }

  const getPriorityColor = (priority: PendingAlert['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/20'
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20'
      case 'low':
        return 'text-blue-400 bg-blue-500/20'
      default:
        return 'text-gray-400 bg-gray-500/20'
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Agora'
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h atrás`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d atrás`
  }

  if (alerts.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded">
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Alertas Pendentes</h2>
            <p className="text-sm text-gray-400 mt-1">Ações necessárias</p>
          </div>
        </div>

        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-green-400 mb-2 font-medium">Tudo em ordem!</p>
          <p className="text-sm text-gray-500">
            Não há alertas pendentes no momento
          </p>
        </div>
      </div>
    )
  }

  // Ordenar alertas por prioridade e data
  const sortedAlerts = [...alerts].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) return priorityDiff
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const highPriorityCount = alerts.filter(a => a.priority === 'high').length
  const mediumPriorityCount = alerts.filter(a => a.priority === 'medium').length

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/20 rounded">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Alertas Pendentes</h2>
            <p className="text-sm text-gray-400 mt-1">
              {alerts.length} {alerts.length === 1 ? 'alerta' : 'alertas'} 
              {highPriorityCount > 0 && (
                <span className="text-red-400 ml-1">
                  ({highPriorityCount} alta prioridade)
                </span>
              )}
            </p>
          </div>
        </div>
        
        {/* Resumo de prioridades */}
        <div className="flex space-x-2">
          {highPriorityCount > 0 && (
            <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
              {highPriorityCount} alta
            </div>
          )}
          {mediumPriorityCount > 0 && (
            <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
              {mediumPriorityCount} média
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {sortedAlerts.slice(0, 4).map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 transition-colors hover:border-gray-500 ${getAlertColor(alert.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium mb-1">
                    {alert.message}
                  </p>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className={`px-2 py-1 rounded-full ${getPriorityColor(alert.priority)}`}>
                      {getPriorityLabel(alert.priority)}
                    </span>
                    <span className="text-gray-500">
                      {formatTimeAgo(alert.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-3">
                {onViewAppointment && (
                  <button
                    onClick={() => onViewAppointment(alert.agendamentoId)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Ver agendamento"
                  >
                    <AlertCircle className="h-4 w-4" />
                  </button>
                )}
                {onDismissAlert && (
                  <button
                    onClick={() => onDismissAlert(alert.id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    title="Dispensar alerta"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length > 4 && (
        <div className="mt-4 pt-4 border-t border-gray-700 text-center">
          <button className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors">
            Ver todos os alertas ({alerts.length})
          </button>
        </div>
      )}
    </div>
  )
}