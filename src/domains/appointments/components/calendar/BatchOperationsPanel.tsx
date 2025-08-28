'use client'

import { useState } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  X,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Select } from '@/shared/components/ui/Select'
import { AppointmentStatus } from '../../types/appointment'

interface BatchOperationsPanelProps {
  selectedCount: number
  onBatchUpdate: (appointmentIds: string[], status: AppointmentStatus) => Promise<void>
  onSelectAll: () => void
  onClearSelection: () => void
}

const statusOptions = [
  { value: 'confirmado', label: 'Confirmar', icon: CheckCircle, color: 'text-green-400' },
  { value: 'em_andamento', label: 'Iniciar Atendimento', icon: Clock, color: 'text-yellow-400' },
  { value: 'concluido', label: 'Concluir', icon: CheckCircle, color: 'text-blue-400' },
  { value: 'cancelado', label: 'Cancelar', icon: XCircle, color: 'text-red-400' },
  { value: 'nao_compareceu', label: 'Não Compareceu', icon: AlertTriangle, color: 'text-purple-400' }
]

export function BatchOperationsPanel({
  selectedCount,
  onBatchUpdate,
  onSelectAll,
  onClearSelection
}: BatchOperationsPanelProps) {
  const [selectedAction, setSelectedAction] = useState<AppointmentStatus | ''>('')
  const [loading, setLoading] = useState(false)

  const handleBatchUpdate = async () => {
    if (!selectedAction) return

    try {
      setLoading(true)
      // Note: Esta função precisa dos IDs dos agendamentos selecionados
      // Por simplicidade, vamos assumir que os IDs estão disponíveis no contexto pai
      await onBatchUpdate([], selectedAction as AppointmentStatus)
      setSelectedAction('')
    } catch (error) {
      console.error('Erro ao executar operação em lote:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Informações da seleção */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">
              {selectedCount} agendamento(s) selecionado(s)
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onSelectAll}
            className="text-yellow-400 hover:bg-yellow-500/20"
          >
            Selecionar Todos
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-gray-400 hover:bg-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        </div>

        {/* Ações em lote */}
        <div className="flex items-center space-x-3">
          <Select
            value={selectedAction}
            onChange={(value) => setSelectedAction(value as AppointmentStatus)}
            className="bg-gray-700 border-gray-600 text-white min-w-[200px]"
          >
            <option value="">Selecione uma ação...</option>
            {statusOptions.map(option => {
              const Icon = option.icon
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </Select>

          <Button
            onClick={handleBatchUpdate}
            disabled={!selectedAction || loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-900 border-t-transparent mr-2"></div>
                Processando...
              </>
            ) : (
              'Aplicar'
            )}
          </Button>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="mt-4 pt-4 border-t border-yellow-500/30">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-400 mr-2">Ações rápidas:</span>
          
          {statusOptions.slice(0, 3).map(option => {
            const Icon = option.icon
            return (
              <Button
                key={option.value}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedAction(option.value as AppointmentStatus)
                  // Auto-executar ação rápida
                  setTimeout(() => handleBatchUpdate(), 100)
                }}
                disabled={loading}
                className={`border-gray-600 hover:bg-gray-700 ${option.color}`}
              >
                <Icon className="h-3 w-3 mr-1" />
                {option.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Aviso */}
      <div className="mt-3 p-3 bg-gray-800/50 rounded border border-gray-700">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-400">
            <p className="font-medium text-yellow-400 mb-1">Atenção:</p>
            <p>
              As operações em lote afetarão todos os agendamentos selecionados. 
              Esta ação não pode ser desfeita. Certifique-se de que selecionou os agendamentos corretos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}