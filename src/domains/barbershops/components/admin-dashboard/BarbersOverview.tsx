'use client'

import { User, Clock, DollarSign, Calendar } from 'lucide-react'
import { BarbeiroResumo } from '../../types/admin-dashboard'

interface BarbersOverviewProps {
  barbeiros: BarbeiroResumo[]
}

export function BarbersOverview({ barbeiros }: BarbersOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'ocupado':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'ausente':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600/30'
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      disponivel: 'Disponível',
      ocupado: 'Ocupado',
      ausente: 'Ausente'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      <div className="p-6 border-b border-theme-primary">
        <h2 className="text-xl font-semibold text-theme-primary">
          Barbeiros - Visão Geral
        </h2>
      </div>

      <div className="p-4">
        {barbeiros.length === 0 ? (
          <div className="text-center py-6 text-theme-tertiary">
            <User className="h-10 w-10 mx-auto mb-2 text-theme-muted" />
            <p className="text-sm">Nenhum barbeiro cadastrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {barbeiros.map((barbeiro) => (
              <div key={barbeiro.id} className="border border-theme-primary rounded-lg p-3 hover:border-theme-hover transition-colors bg-theme-tertiary">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="relative">
                    {barbeiro.avatar ? (
                      <img
                        src={barbeiro.avatar}
                        alt={barbeiro.nome}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-theme-tertiary flex items-center justify-center">
                        <User className="h-5 w-5 text-theme-tertiary" />
                      </div>
                    )}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-theme-secondary ${
                      barbeiro.status === 'disponivel' ? 'bg-green-500' :
                      barbeiro.status === 'ocupado' ? 'bg-orange-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-theme-primary text-sm truncate">{barbeiro.nome}</h3>
                    <span className={`inline-block px-1.5 py-0.5 text-xs font-medium rounded border ${getStatusColor(barbeiro.status)}`}>
                      {getStatusText(barbeiro.status)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-theme-tertiary" />
                      <span className="text-theme-secondary">Hoje</span>
                    </div>
                    <span className="font-medium text-theme-primary">
                      {barbeiro.agendamentosHoje}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-theme-tertiary" />
                      <span className="text-theme-secondary">Receita</span>
                    </div>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      R$ {barbeiro.receitaHoje.toLocaleString()}
                    </span>
                  </div>

                  {barbeiro.proximoAgendamento && (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-theme-tertiary" />
                        <span className="text-theme-secondary">Próximo</span>
                      </div>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {barbeiro.proximoAgendamento.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}

                  {barbeiro.especialidades.length > 0 && (
                    <div className="pt-2 border-t border-theme-primary">
                      <div className="flex flex-wrap gap-1">
                        {barbeiro.especialidades.slice(0, 2).map((especialidade, index) => (
                          <span
                            key={index}
                            className="inline-block px-1.5 py-0.5 text-xs bg-theme-tertiary text-theme-secondary rounded"
                          >
                            {especialidade}
                          </span>
                        ))}
                        {barbeiro.especialidades.length > 2 && (
                          <span className="inline-block px-1.5 py-0.5 text-xs bg-theme-tertiary text-theme-secondary rounded">
                            +{barbeiro.especialidades.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}