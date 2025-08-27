'use client'

import { useState } from 'react'
import { Save, Clock } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { HorarioFuncionamento } from '../../types/schedule'

interface WorkingHoursProps {
  horarios: HorarioFuncionamento[]
  onSalvar: (horarios: HorarioFuncionamento[]) => Promise<any>
}

const diasSemana = [
  { valor: 1, nome: 'Segunda-feira', abrev: 'SEG' },
  { valor: 2, nome: 'Terça-feira', abrev: 'TER' },
  { valor: 3, nome: 'Quarta-feira', abrev: 'QUA' },
  { valor: 4, nome: 'Quinta-feira', abrev: 'QUI' },
  { valor: 5, nome: 'Sexta-feira', abrev: 'SEX' },
  { valor: 6, nome: 'Sábado', abrev: 'SAB' },
  { valor: 0, nome: 'Domingo', abrev: 'DOM' }
]

export function WorkingHours({ horarios, onSalvar }: WorkingHoursProps) {
  const [horariosEditados, setHorariosEditados] = useState<HorarioFuncionamento[]>(horarios)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const atualizarHorario = (diaSemana: number, campo: 'horaAbertura' | 'horaFechamento' | 'ativo', valor: string | boolean) => {
    setHorariosEditados(prev => 
      prev.map(h => 
        h.diaSemana === diaSemana 
          ? { ...h, [campo]: valor }
          : h
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    for (const horario of horariosEditados) {
      if (horario.ativo) {
        if (!horario.horaAbertura || !horario.horaFechamento) {
          setError('Preencha os horários de abertura e fechamento para os dias ativos')
          return
        }
        
        if (horario.horaAbertura >= horario.horaFechamento) {
          setError('O horário de abertura deve ser anterior ao horário de fechamento')
          return
        }
      }
    }

    try {
      setLoading(true)
      setError(null)
      await onSalvar(horariosEditados)
    } catch (err) {
      setError('Erro ao salvar horários de funcionamento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      {/* Header */}
      <div className="p-6 border-b border-theme-primary">
        <div className="flex items-center space-x-3">
          <Clock className="h-6 w-6 text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold text-theme-primary">
              Horários de Funcionamento
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Configure os horários de abertura e fechamento para cada dia da semana
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

        <div className="space-y-4">
          {diasSemana.map((dia) => {
            const horario = horariosEditados.find(h => h.diaSemana === dia.valor)
            
            return (
              <div key={dia.valor} className="flex items-center space-x-4 p-4 border border-gray-600 rounded-lg">
                {/* Checkbox para ativar/desativar */}
                <div className="flex items-center space-x-3 w-40">
                  <input
                    type="checkbox"
                    checked={horario?.ativo || false}
                    onChange={(e) => atualizarHorario(dia.valor, 'ativo', e.target.checked)}
                    className="rounded border-theme-primary bg-theme-secondary text-yellow-500 focus:ring-yellow-500"
                  />
                  <div>
                    <span className="text-theme-primary font-medium">{dia.abrev}</span>
                    <p className="text-xs text-theme-tertiary">{dia.nome}</p>
                  </div>
                </div>

                {/* Horários */}
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-300 w-16">Abertura:</label>
                    <Input
                      type="time"
                      value={horario?.horaAbertura || ''}
                      onChange={(e) => atualizarHorario(dia.valor, 'horaAbertura', e.target.value)}
                      disabled={!horario?.ativo}
                      className="w-32"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-300 w-20">Fechamento:</label>
                    <Input
                      type="time"
                      value={horario?.horaFechamento || ''}
                      onChange={(e) => atualizarHorario(dia.valor, 'horaFechamento', e.target.value)}
                      disabled={!horario?.ativo}
                      className="w-32"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="w-20 text-right">
                  {horario?.ativo ? (
                    <span className="text-green-400 text-sm">Aberto</span>
                  ) : (
                    <span className="text-red-400 text-sm">Fechado</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Botão de Salvar */}
        <div className="flex justify-end pt-6 border-t border-theme-primary">
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
                Salvar Horários
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}