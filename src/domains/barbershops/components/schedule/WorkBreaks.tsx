'use client'

import { useState } from 'react'
import { Save, Calendar, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { IntervaloTrabalho } from '../../types/schedule'

interface WorkBreaksProps {
  intervalos: IntervaloTrabalho[]
  onSalvar: (intervalos: IntervaloTrabalho[]) => Promise<any>
}

const diasSemana = [
  { valor: 1, nome: 'SEG' },
  { valor: 2, nome: 'TER' },
  { valor: 3, nome: 'QUA' },
  { valor: 4, nome: 'QUI' },
  { valor: 5, nome: 'SEX' },
  { valor: 6, nome: 'SAB' },
  { valor: 0, nome: 'DOM' }
]

export function WorkBreaks({ intervalos, onSalvar }: WorkBreaksProps) {
  const [intervalosEditados, setIntervalosEditados] = useState<IntervaloTrabalho[]>(intervalos)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const adicionarIntervalo = () => {
    const novoIntervalo: IntervaloTrabalho = {
      id: Math.random().toString(36).substr(2, 9),
      nome: '',
      horaInicio: '12:00',
      horaFim: '13:00',
      diasSemana: [1, 2, 3, 4, 5],
      ativo: true
    }
    
    setIntervalosEditados(prev => [...prev, novoIntervalo])
  }

  const removerIntervalo = (id: string) => {
    setIntervalosEditados(prev => prev.filter(i => i.id !== id))
  }

  const atualizarIntervalo = (id: string, campo: keyof IntervaloTrabalho, valor: any) => {
    setIntervalosEditados(prev => 
      prev.map(i => 
        i.id === id 
          ? { ...i, [campo]: valor }
          : i
      )
    )
  }

  const toggleDiaSemana = (intervalId: string, diaSemana: number) => {
    setIntervalosEditados(prev => 
      prev.map(i => {
        if (i.id === intervalId) {
          const diasSemana = i.diasSemana.includes(diaSemana)
            ? i.diasSemana.filter(d => d !== diaSemana)
            : [...i.diasSemana, diaSemana]
          return { ...i, diasSemana }
        }
        return i
      })
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    for (const intervalo of intervalosEditados) {
      if (intervalo.ativo) {
        if (!intervalo.nome.trim()) {
          setError('Preencha o nome de todos os intervalos ativos')
          return
        }
        
        if (!intervalo.horaInicio || !intervalo.horaFim) {
          setError('Preencha os horários de início e fim para todos os intervalos ativos')
          return
        }
        
        if (intervalo.horaInicio >= intervalo.horaFim) {
          setError('O horário de início deve ser anterior ao horário de fim')
          return
        }
        
        if (intervalo.diasSemana.length === 0) {
          setError('Selecione pelo menos um dia da semana para cada intervalo ativo')
          return
        }
      }
    }

    try {
      setLoading(true)
      setError(null)
      await onSalvar(intervalosEditados)
    } catch (err) {
      setError('Erro ao salvar intervalos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-yellow-500" />
            <div>
              <h2 className="text-xl font-semibold text-white">
                Intervalos de Trabalho
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Configure pausas e intervalos durante o expediente
              </p>
            </div>
          </div>
          
          <Button
            type="button"
            onClick={adicionarIntervalo}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Intervalo
          </Button>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {intervalosEditados.map((intervalo) => (
            <div key={intervalo.id} className="border border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={intervalo.ativo}
                    onChange={(e) => atualizarIntervalo(intervalo.id, 'ativo', e.target.checked)}
                    className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                  />
                  <div className="flex-1">
                    <Input
                      value={intervalo.nome}
                      onChange={(e) => atualizarIntervalo(intervalo.id, 'nome', e.target.value)}
                      placeholder="Nome do intervalo (ex: Almoço)"
                      disabled={!intervalo.ativo}
                      className="font-medium"
                    />
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removerIntervalo(intervalo.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-300 w-16">Início:</label>
                  <Input
                    type="time"
                    value={intervalo.horaInicio}
                    onChange={(e) => atualizarIntervalo(intervalo.id, 'horaInicio', e.target.value)}
                    disabled={!intervalo.ativo}
                    className="w-32"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-300 w-16">Fim:</label>
                  <Input
                    type="time"
                    value={intervalo.horaFim}
                    onChange={(e) => atualizarIntervalo(intervalo.id, 'horaFim', e.target.value)}
                    disabled={!intervalo.ativo}
                    className="w-32"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Dias da semana:
                </label>
                <div className="flex flex-wrap gap-2">
                  {diasSemana.map((dia) => (
                    <label
                      key={dia.valor}
                      className={`flex items-center justify-center w-12 h-8 rounded cursor-pointer text-sm font-medium transition-colors ${
                        intervalo.diasSemana.includes(dia.valor)
                          ? 'bg-yellow-500 text-gray-900'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      } ${!intervalo.ativo ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={intervalo.diasSemana.includes(dia.valor)}
                        onChange={() => toggleDiaSemana(intervalo.id, dia.valor)}
                        disabled={!intervalo.ativo}
                        className="sr-only"
                      />
                      {dia.nome}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {intervalosEditados.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">
                Nenhum intervalo configurado
              </p>
              <p className="text-sm text-gray-500">
                Adicione intervalos para pausas durante o expediente
              </p>
            </div>
          )}
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
                Salvar Intervalos
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}