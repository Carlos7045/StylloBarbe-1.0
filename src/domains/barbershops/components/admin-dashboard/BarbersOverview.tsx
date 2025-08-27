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
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">
          Barbeiros - Visão Geral
        </h2>
      </div>

      <div className="p-6">
        {barbeiros.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <User className="h-12 w-12 mx-auto mb-3 text-gray-500" />
            <p>Nenhum barbeiro cadastrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {barbeiros.map((barbeiro) => (
              <div key={barbeiro.id} className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors bg-gray-700/50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    {barbeiro.avatar ? (
                      <img
                        src={barbeiro.avatar}
                        alt={barbeiro.nome}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                      barbeiro.status === 'disponivel' ? 'bg-green-500' :
                      barbeiro.status === 'ocupado' ? 'bg-orange-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{barbeiro.nome}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(barbeiro.status)}`}>
                      {getStatusText(barbeiro.status)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">Agendamentos hoje</span>
                    </div>
                    <span className="font-medium text-white">
                      {barbeiro.agendamentosHoje}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">Receita hoje</span>
                    </div>
                    <span className="font-medium text-green-400">
                      R$ {barbeiro.receitaHoje.toLocaleString()}
                    </span>
                  </div>

                  {barbeiro.proximoAgendamento && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">Próximo</span>
                      </div>
                      <span className="font-medium text-blue-400">
                        {barbeiro.proximoAgendamento.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}

                  {barbeiro.especialidades.length > 0 && (
                    <div className="pt-2 border-t border-gray-600">
                      <p className="text-xs text-gray-500 mb-1">Especialidades:</p>
                      <div className="flex flex-wrap gap-1">
                        {barbeiro.especialidades.slice(0, 3).map((especialidade, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded"
                          >
                            {especialidade}
                          </span>
                        ))}
                        {barbeiro.especialidades.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded">
                            +{barbeiro.especialidades.length - 3}
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