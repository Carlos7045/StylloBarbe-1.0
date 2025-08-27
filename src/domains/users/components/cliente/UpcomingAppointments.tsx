'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone,
  Edit,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { AgendamentoCliente } from '../../types/cliente-dashboard'

interface UpcomingAppointmentsProps {
  agendamentos: AgendamentoCliente[]
  carregando?: boolean
  onReagendar: (agendamentoId: string, novaDataHora: Date) => void
  onCancelar: (agendamentoId: string, motivo?: string) => void
  reagendando?: boolean
  cancelando?: boolean
}

export function UpcomingAppointments({ 
  agendamentos, 
  carregando,
  onReagendar,
  onCancelar,
  reagendando,
  cancelando
}: UpcomingAppointmentsProps) {
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<string | null>(null)
  const [acao, setAcao] = useState<'reagendar' | 'cancelar' | null>(null)
  const [novaDataHora, setNovaDataHora] = useState('')
  const [motivoCancelamento, setMotivoCancelamento] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'agendado':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado'
      case 'agendado':
        return 'Agendado'
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <CheckCircle className="h-4 w-4" />
      case 'agendado':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const isProximo = (dataHora: Date) => {
    const agora = new Date()
    const diferenca = dataHora.getTime() - agora.getTime()
    const horas = diferenca / (1000 * 60 * 60)
    return horas <= 24 && horas > 0
  }

  const handleReagendar = () => {
    if (agendamentoSelecionado && novaDataHora) {
      onReagendar(agendamentoSelecionado, new Date(novaDataHora))
      setAgendamentoSelecionado(null)
      setAcao(null)
      setNovaDataHora('')
    }
  }

  const handleCancelar = () => {
    if (agendamentoSelecionado) {
      onCancelar(agendamentoSelecionado, motivoCancelamento || undefined)
      setAgendamentoSelecionado(null)
      setAcao(null)
      setMotivoCancelamento('')
    }
  }

  const cancelarAcao = () => {
    setAgendamentoSelecionado(null)
    setAcao(null)
    setNovaDataHora('')
    setMotivoCancelamento('')
  }

  if (carregando) {
    return (
      <div className="bg-theme-secondary border border-theme-primary rounded-lg">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-theme-secondary border border-theme-primary rounded-lg">
      <div className="p-6 border-b border-theme-primary">
        <div className="flex items-center space-x-3">
          <Calendar className="h-6 w-6 text-amber-400" />
          <div>
            <h2 className="text-xl font-semibold text-theme-primary">
              Próximos Agendamentos
            </h2>
            <p className="text-sm text-theme-tertiary mt-1">
              {agendamentos.length} agendamento{agendamentos.length !== 1 ? 's' : ''} próximo{agendamentos.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {agendamentos.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-theme-muted mx-auto mb-4" />
            <p className="text-theme-tertiary mb-4">
              Você não possui agendamentos futuros
            </p>
            <Button variant="primary">
              Fazer Novo Agendamento
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {agendamentos.map((agendamento) => (
              <div key={agendamento.id}>
                <div className={`border rounded-lg p-4 transition-all ${
                  isProximo(agendamento.dataHora) 
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-400/10' 
                    : 'border-theme-primary hover:border-theme-hover bg-theme-secondary'
                }`}>
                  {isProximo(agendamento.dataHora) && (
                    <div className="flex items-center space-x-2 mb-3 text-amber-400">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Agendamento nas próximas 24 horas</span>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-theme-muted" />
                        <span className="font-medium text-theme-primary">
                          {agendamento.dataHora.toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-theme-muted" />
                        <span className="text-lg font-semibold text-theme-primary">
                          {agendamento.dataHora.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        <span className="text-sm text-theme-muted">
                          ({agendamento.duracao} min)
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="h-4 w-4 text-theme-muted" />
                        <div>
                          <span className="font-medium text-theme-primary">{agendamento.barbeariaNome}</span>
                          <p className="text-sm text-theme-tertiary">{agendamento.barbeariaEndereco}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-theme-muted" />
                        <span className="text-theme-secondary">{agendamento.barbeiroNome}</span>
                      </div>

                      <div className="text-sm text-theme-secondary mb-2">
                        <span className="font-medium">{agendamento.servicoNome}</span>
                      </div>

                      {agendamento.observacoes && (
                        <div className="mt-2 p-2 bg-theme-tertiary rounded text-sm text-theme-secondary">
                          <strong>Observações:</strong> {agendamento.observacoes}
                        </div>
                      )}
                    </div>

                    <div className="text-right">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(agendamento.status)} mb-2`}>
                        {getStatusIcon(agendamento.status)}
                        <span>{getStatusText(agendamento.status)}</span>
                      </div>
                      <div className="text-lg font-semibold text-theme-primary">
                        R$ {agendamento.valorTotal.toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex justify-between items-center pt-3 border-t border-theme-primary">
                    <div className="flex items-center space-x-2 text-sm text-theme-tertiary">
                      <Phone className="h-4 w-4" />
                      <span>Contato da barbearia disponível</span>
                    </div>

                    <div className="flex space-x-2">
                      {agendamento.podeReagendar && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setAgendamentoSelecionado(agendamento.id)
                            setAcao('reagendar')
                          }}
                          disabled={reagendando}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Reagendar
                        </Button>
                      )}
                      {agendamento.podeCancelar && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setAgendamentoSelecionado(agendamento.id)
                            setAcao('cancelar')
                          }}
                          disabled={cancelando}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal de Reagendamento */}
                {agendamentoSelecionado === agendamento.id && acao === 'reagendar' && (
                  <div className="mt-4 p-4 border border-blue-500/30 bg-blue-500/10 rounded-lg">
                    <h3 className="font-medium text-blue-300 mb-3">Reagendar Agendamento</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-blue-300 mb-1">
                          Nova Data e Hora
                        </label>
                        <input
                          type="datetime-local"
                          value={novaDataHora}
                          onChange={(e) => setNovaDataHora(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                          className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="primary"
                          size="sm"
                          onClick={handleReagendar}
                          disabled={!novaDataHora || reagendando}
                        >
                          {reagendando ? 'Reagendando...' : 'Confirmar'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={cancelarAcao}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal de Cancelamento */}
                {agendamentoSelecionado === agendamento.id && acao === 'cancelar' && (
                  <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10 rounded-lg">
                    <h3 className="font-medium text-red-300 mb-3">Cancelar Agendamento</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-red-300 mb-1">
                          Motivo do cancelamento (opcional)
                        </label>
                        <textarea
                          value={motivoCancelamento}
                          onChange={(e) => setMotivoCancelamento(e.target.value)}
                          placeholder="Informe o motivo do cancelamento..."
                          rows={3}
                          className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                          size="sm"
                          onClick={handleCancelar}
                          disabled={cancelando}
                        >
                          {cancelando ? 'Cancelando...' : 'Confirmar Cancelamento'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={cancelarAcao}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          Voltar
                        </Button>
                      </div>
                    </div>
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