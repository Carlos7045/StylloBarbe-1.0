'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Star, 
  Filter,
  Search,
  ChevronDown,
  MessageSquare,
  History
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { AgendamentoCliente } from '../../types/cliente-dashboard'

interface AppointmentHistoryProps {
  agendamentos: AgendamentoCliente[]
  carregando?: boolean
}

export function AppointmentHistory({ agendamentos, carregando }: AppointmentHistoryProps) {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [busca, setBusca] = useState('')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  // Filtrar agendamentos
  const agendamentosFiltrados = agendamentos.filter(agendamento => {
    const matchStatus = filtroStatus === 'todos' || agendamento.status === filtroStatus
    const matchBusca = busca === '' || 
      agendamento.barbeariaNome.toLowerCase().includes(busca.toLowerCase()) ||
      agendamento.barbeiroNome.toLowerCase().includes(busca.toLowerCase()) ||
      agendamento.servicoNome.toLowerCase().includes(busca.toLowerCase())
    
    return matchStatus && matchBusca
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'bg-green-500/20 text-green-400'
      case 'agendado':
        return 'bg-blue-500/20 text-blue-400'
      case 'confirmado':
        return 'bg-purple-500/20 text-purple-400'
      case 'em_andamento':
        return 'bg-amber-400/20 text-amber-400'
      case 'cancelado':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-600/20 text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concluido':
        return 'Concluído'
      case 'agendado':
        return 'Agendado'
      case 'confirmado':
        return 'Confirmado'
      case 'em_andamento':
        return 'Em Andamento'
      case 'cancelado':
        return 'Cancelado'
      default:
        return status
    }
  }

  const renderStars = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < nota ? 'text-amber-400 fill-current' : 'text-theme-muted'
        }`}
      />
    ))
  }

  if (carregando) {
    return (
      <div className="bg-theme-secondary rounded-lg border border-theme-primary">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-theme-tertiary rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="border border-theme-primary rounded-lg p-4">
                  <div className="h-4 bg-theme-tertiary rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-theme-tertiary rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      <div className="p-6 border-b border-theme-primary">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <History className="h-6 w-6 text-amber-400" />
            <h2 className="text-xl font-semibold text-theme-primary">
              Histórico de Agendamentos
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${
              mostrarFiltros ? 'rotate-180' : ''
            }`} />
          </Button>
        </div>

        {/* Filtros */}
        {mostrarFiltros && (
          <div className="space-y-4 p-4 bg-theme-tertiary rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Busca */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-muted" />
                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar por barbearia, barbeiro ou serviço..."
                    className="w-full pl-10 pr-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder:text-theme-muted"
                  />
                </div>
              </div>

              {/* Filtro por Status */}
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-1">
                  Status
                </label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="agendado">Agendado</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {agendamentosFiltrados.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-theme-muted mx-auto mb-4" />
            <p className="text-theme-tertiary">
              {busca || filtroStatus !== 'todos' 
                ? 'Nenhum agendamento encontrado com os filtros aplicados'
                : 'Você ainda não possui agendamentos'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {agendamentosFiltrados.map((agendamento) => (
              <div key={agendamento.id} className="border border-theme-primary rounded-lg p-4 hover:border-theme-hover transition-colors bg-theme-tertiary">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-theme-muted" />
                      <span className="font-medium text-theme-primary">
                        {agendamento.dataHora.toLocaleDateString('pt-BR')}
                      </span>
                      <Clock className="h-4 w-4 text-theme-muted ml-4" />
                      <span className="text-theme-secondary">
                        {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-theme-muted" />
                      <span className="text-theme-secondary">{agendamento.barbeariaNome}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-theme-muted" />
                      <span className="text-theme-secondary">{agendamento.barbeiroNome}</span>
                    </div>

                    <div className="text-sm text-theme-secondary">
                      <span className="font-medium">{agendamento.servicoNome}</span>
                      <span className="mx-2">•</span>
                      <span>{agendamento.duracao} min</span>
                    </div>

                    {agendamento.observacoes && (
                      <div className="mt-2 p-2 bg-theme-secondary rounded text-sm text-theme-secondary">
                        <MessageSquare className="h-4 w-4 inline mr-1" />
                        {agendamento.observacoes}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(agendamento.status)}`}>
                        {getStatusText(agendamento.status)}
                      </span>
                    </div>
                    <div className="text-lg font-semibold text-theme-primary">
                      R$ {agendamento.valorTotal.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                </div>

                {/* Avaliação do cliente */}
                {agendamento.avaliacaoCliente && (
                  <div className="mt-3 p-3 bg-amber-400/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-amber-300">Sua avaliação:</span>
                      <div className="flex space-x-1">
                        {renderStars(agendamento.avaliacaoCliente.nota)}
                      </div>
                    </div>
                    {agendamento.avaliacaoCliente.comentario && (
                      <p className="text-sm text-amber-200">
                        "{agendamento.avaliacaoCliente.comentario}"
                      </p>
                    )}
                  </div>
                )}

                {/* Ações para agendamentos futuros */}
                {(agendamento.status === 'agendado' || agendamento.status === 'confirmado') && (
                  <div className="mt-3 flex space-x-2">
                    {agendamento.podeReagendar && (
                      <Button variant="outline" size="sm">
                        Reagendar
                      </Button>
                    )}
                    {agendamento.podeCancelar && (
                      <Button variant="outline" size="sm">
                        Cancelar
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}