'use client'

import { Bell, DollarSign, UserPlus, UserMinus, HelpCircle } from 'lucide-react'
import { AlertaAdmin } from '../../types/admin-saas'

interface AlertsPanelProps {
  alertas: AlertaAdmin[]
  onMarkAsRead: (id: string) => void
}

export function AlertsPanel({ alertas, onMarkAsRead }: AlertsPanelProps) {
  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case 'pagamento_vencido':
        return <DollarSign className="h-5 w-5 text-red-500" />
      case 'novo_cadastro':
        return <UserPlus className="h-5 w-5 text-green-500" />
      case 'cancelamento':
        return <UserMinus className="h-5 w-5 text-orange-500" />
      case 'suporte':
        return <HelpCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getAlertBgColor = (tipo: string, lido: boolean) => {
    if (lido) return 'bg-gray-50'
    
    switch (tipo) {
      case 'pagamento_vencido':
        return 'bg-red-50 border-red-200'
      case 'novo_cadastro':
        return 'bg-green-50 border-green-200'
      case 'cancelamento':
        return 'bg-orange-50 border-orange-200'
      case 'suporte':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50'
    }
  }

  const alertasNaoLidos = alertas.filter(a => !a.lido).length

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Alertas e Notificações
          </h2>
          {alertasNaoLidos > 0 && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              {alertasNaoLidos} novos
            </span>
          )}
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {alertas.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Nenhum alerta no momento</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {alertas.map((alerta) => (
              <div
                key={alerta.id}
                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${getAlertBgColor(alerta.tipo, alerta.lido)} ${
                  !alerta.lido ? 'border-l-4' : ''
                }`}
                onClick={() => !alerta.lido && onMarkAsRead(alerta.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alerta.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${
                        alerta.lido ? 'text-gray-600' : 'text-gray-900'
                      }`}>
                        {alerta.titulo}
                      </p>
                      {!alerta.lido && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${
                      alerta.lido ? 'text-gray-500' : 'text-gray-700'
                    }`}>
                      {alerta.descricao}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
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