'use client'

import { useState } from 'react'
import { Save, Settings } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { ConfiguracaoAgendamento } from '../../types/schedule'

interface BookingSettingsProps {
  configuracao: ConfiguracaoAgendamento
  onSalvar: (configuracao: ConfiguracaoAgendamento) => Promise<any>
}

export function BookingSettings({ configuracao, onSalvar }: BookingSettingsProps) {
  const [config, setConfig] = useState<ConfiguracaoAgendamento>(configuracao)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const atualizarConfig = (campo: keyof ConfiguracaoAgendamento, valor: any) => {
    setConfig(prev => ({ ...prev, [campo]: valor }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    if (config.antecedenciaMinima < 0) {
      setError('A antecedência mínima deve ser maior ou igual a 0')
      return
    }
    
    if (config.antecedenciaMaxima <= 0) {
      setError('A antecedência máxima deve ser maior que 0')
      return
    }
    
    if (config.antecedenciaMinima >= config.antecedenciaMaxima * 24) {
      setError('A antecedência mínima deve ser menor que a máxima')
      return
    }
    
    if (config.intervaloPadrao <= 0) {
      setError('O intervalo padrão deve ser maior que 0')
      return
    }

    try {
      setLoading(true)
      setError(null)
      await onSalvar(config)
    } catch (err) {
      setError('Erro ao salvar configurações')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Settings className="h-6 w-6 text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold text-white">
              Configurações de Agendamento
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Configure regras para agendamentos, cancelamentos e reagendamentos
            </p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Antecedência */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Antecedência para Agendamentos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Antecedência Mínima (horas)
              </label>
              <Input
                type="number"
                value={config.antecedenciaMinima}
                onChange={(e) => atualizarConfig('antecedenciaMinima', parseInt(e.target.value) || 0)}
                min="0"
                placeholder="2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tempo mínimo antes do agendamento
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Antecedência Máxima (dias)
              </label>
              <Input
                type="number"
                value={config.antecedenciaMaxima}
                onChange={(e) => atualizarConfig('antecedenciaMaxima', parseInt(e.target.value) || 1)}
                min="1"
                placeholder="30"
              />
              <p className="text-xs text-gray-500 mt-1">
                Quantos dias no futuro é possível agendar
              </p>
            </div>
          </div>
        </div>

        {/* Intervalos */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Intervalos</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Intervalo Padrão entre Agendamentos (minutos)
            </label>
            <Input
              type="number"
              value={config.intervaloPadrao}
              onChange={(e) => atualizarConfig('intervaloPadrao', parseInt(e.target.value) || 15)}
              min="5"
              step="5"
              placeholder="15"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tempo de limpeza/preparação entre clientes
            </p>
          </div>
        </div>

        {/* Dias Permitidos */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Dias Permitidos para Agendamento</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.permitirAgendamentoSabado}
                onChange={(e) => atualizarConfig('permitirAgendamentoSabado', e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-gray-300">Permitir agendamentos aos sábados</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.permitirAgendamentoDomingo}
                onChange={(e) => atualizarConfig('permitirAgendamentoDomingo', e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-gray-300">Permitir agendamentos aos domingos</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.permitirAgendamentoFeriado}
                onChange={(e) => atualizarConfig('permitirAgendamentoFeriado', e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-gray-300">Permitir agendamentos em feriados</span>
            </label>
          </div>
        </div>

        {/* Cancelamentos e Reagendamentos */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Cancelamentos e Reagendamentos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Antecedência para Cancelamento (horas)
              </label>
              <Input
                type="number"
                value={config.cancelamentoAntecedencia}
                onChange={(e) => atualizarConfig('cancelamentoAntecedencia', parseInt(e.target.value) || 0)}
                min="0"
                placeholder="4"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tempo mínimo para cancelar sem penalidade
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Antecedência para Reagendamento (horas)
              </label>
              <Input
                type="number"
                value={config.reagendamentoAntecedencia}
                onChange={(e) => atualizarConfig('reagendamentoAntecedencia', parseInt(e.target.value) || 0)}
                min="0"
                placeholder="2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tempo mínimo para reagendar
              </p>
            </div>
          </div>
        </div>

        {/* Botão de Salvar */}
        <div className="flex justify-end pt-6 border-t border-gray-700">
          <Button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
          >
            {loading ? (
              <>Salvando...</>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}