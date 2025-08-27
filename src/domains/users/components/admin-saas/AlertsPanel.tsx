'use client'

import { AlertTriangle, Info, CheckCircle, XCircle, Bell } from 'lucide-react'

interface Alerta {
  id: string
  titulo: string
  descricao: string
  tipo: 'info' | 'warning' | 'error' | 'success'
  prioridade: 'baixa' | 'media' | 'alta'
  lido: boolean
  criadoEm: Date
  barbeariaId?: string
  barbeariaNome?: string
}

interface AlertsPanelProps {
  alertas: Alerta[]
  onMarkAsRead: (id: string) => void
}

export function AlertsPanel({ alertas, onMarkAsRead }: AlertsPanelProps) {
  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />
      default:
        return <Bell className="h-5 w-5 text-theme-tertiary" />
    }
  }

  const getAlertBgColor = (tipo: string, lido: boolean) => {
    if (lido) return 'bg-theme-tertiary'
    
    switch (tipo) {
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400'
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400'
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400'
      default:
        return 'bg-theme-tertiary'
    }
  }

  const getPrioridadeText = (prioridade: string) => {
    const prioridadeMap = {
      baixa: 'Baixa',
      media: 'Média',
      alta: 'Alta'
    }
    return prioridadeMap[prioridade as keyof typeof prioridadeMap] || prioridade
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return 'text-red-400'
      case 'media':
        return 'text-yellow-400'
      case 'baixa':
        return 'text-green-400'
      default:
        return 'text-theme-tertiary'
    }
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      <div className="p-6 border-b border-theme-primary">
        <h2 className="text-xl font-semibold text-theme-primary flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Alertas do Sistema
        </h2>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {alertas.length === 0 ? (
          <div className="p-6 text-center text-theme-tertiary">
            <Bell className="h-12 w-12 mx-auto mb-3 text-theme-muted" />
            <p>Nenhum alerta no momento</p>
          </div>
        ) : (
          <div className="divide-y divide-theme-primary">
            {alertas.map((alerta) => (
              <div
                key={alerta.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-theme-hover ${getAlertBgColor(alerta.tipo, alerta.lido)}`}
                onClick={() => !alerta.lido && onMarkAsRead(alerta.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alerta.tipo)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm font-medium ${
                        alerta.lido ? 'text-theme-tertiary' : 'text-theme-primary'
                      }`}>
                        {alerta.titulo}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium ${getPrioridadeColor(alerta.prioridade)}`}>
                          {getPrioridadeText(alerta.prioridade)}
                        </span>
                        {!alerta.lido && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className={`text-sm ${
                      alerta.lido ? 'text-theme-muted' : 'text-theme-secondary'
                    }`}>
                      {alerta.descricao}
                    </p>
                    
                    {alerta.barbeariaNome && (
                      <p className="text-xs text-theme-muted mt-1">
                        Barbearia: {alerta.barbeariaNome}
                      </p>
                    )}
                    
                    <p className="text-xs text-theme-muted mt-2">
                      {alerta.criadoEm.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}