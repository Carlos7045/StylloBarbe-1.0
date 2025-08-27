'use client'

import { useState, useEffect } from 'react'
import { X, Save, Calendar, Clock, Users } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Select } from '@/shared/components/ui/Select'
import { 
  CriarBloqueioData, 
  AtualizarBloqueioData, 
  BloqueioTemporario
} from '../../types/schedule'
import { ScheduleService } from '../../services/schedule.service'

interface BlockFormProps {
  bloqueioId?: string | null
  barbeiros: { id: string; nome: string }[]
  onSalvar: (data: CriarBloqueioData | AtualizarBloqueioData) => Promise<any>
  onCancelar: () => void
}

export function BlockForm({ 
  bloqueioId, 
  barbeiros, 
  onSalvar, 
  onCancelar 
}: BlockFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Dados do formulário
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tipo, setTipo] = useState<BloqueioTemporario['tipo']>('outros')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFim, setHoraFim] = useState('')
  const [diaInteiro, setDiaInteiro] = useState(true)
  const [barbeirosSelecionados, setBarbeirosSelecionados] = useState<string[]>([])
  const [aplicarTodaBarbearia, setAplicarTodaBarbearia] = useState(true)

  // Carregar dados do bloqueio se estiver editando
  useEffect(() => {
    if (bloqueioId) {
      carregarBloqueio()
    } else {
      // Definir data padrão para hoje
      const hoje = new Date().toISOString().split('T')[0]
      setDataInicio(hoje)
      setDataFim(hoje)
    }
  }, [bloqueioId])

  const carregarBloqueio = async () => {
    if (!bloqueioId) return
    
    try {
      setLoading(true)
      // Em uma implementação real, haveria um método específico para obter um bloqueio
      // Por enquanto, vamos simular
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock data - em uma implementação real viria da API
      const bloqueio = {
        titulo: 'Férias de Final de Ano',
        descricao: 'Barbearia fechada para férias coletivas',
        tipo: 'ferias' as const,
        dataInicio: new Date('2024-12-24'),
        dataFim: new Date('2024-01-02'),
        barbeiroIds: []
      }
      
      setTitulo(bloqueio.titulo)
      setDescricao(bloqueio.descricao || '')
      setTipo(bloqueio.tipo)
      setDataInicio(bloqueio.dataInicio.toISOString().split('T')[0])
      setDataFim(bloqueio.dataFim.toISOString().split('T')[0])
      setBarbeirosSelecionados(bloqueio.barbeiroIds)
      setAplicarTodaBarbearia(bloqueio.barbeiroIds.length === 0)
      
    } catch (err) {
      setError('Erro ao carregar dados do bloqueio')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!titulo.trim() || !dataInicio || !dataFim) {
      setError('Preencha todos os campos obrigatórios')
      return
    }

    const dataInicioObj = new Date(dataInicio)
    const dataFimObj = new Date(dataFim)

    if (dataInicioObj > dataFimObj) {
      setError('A data de início deve ser anterior ou igual à data de fim')
      return
    }

    if (!diaInteiro && (!horaInicio || !horaFim)) {
      setError('Preencha os horários quando não for dia inteiro')
      return
    }

    if (!diaInteiro && horaInicio >= horaFim) {
      setError('O horário de início deve ser anterior ao horário de fim')
      return
    }

    if (!aplicarTodaBarbearia && barbeirosSelecionados.length === 0) {
      setError('Selecione pelo menos um barbeiro ou aplique a toda barbearia')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = {
        titulo: titulo.trim(),
        descricao: descricao.trim() || undefined,
        tipo,
        dataInicio: dataInicioObj,
        dataFim: dataFimObj,
        horaInicio: diaInteiro ? undefined : horaInicio,
        horaFim: diaInteiro ? undefined : horaFim,
        barbeiroIds: aplicarTodaBarbearia ? [] : barbeirosSelecionados
      }

      await onSalvar(data)
      onCancelar()
    } catch (err) {
      setError('Erro ao salvar bloqueio')
    } finally {
      setLoading(false)
    }
  }

  const toggleBarbeiro = (barbeiroId: string) => {
    setBarbeirosSelecionados(prev => 
      prev.includes(barbeiroId)
        ? prev.filter(id => id !== barbeiroId)
        : [...prev, barbeiroId]
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-secondary rounded-lg border border-theme-primary w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-theme-primary flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-theme-primary">
              {bloqueioId ? 'Editar Bloqueio' : 'Novo Bloqueio'}
            </h2>
          </div>
          <Button
            variant="ghost"
            onClick={onCancelar}
            className="text-theme-tertiary hover:text-theme-primary"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-primary flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-yellow-500" />
              <span>Informações do Bloqueio</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título *
                </label>
                <Input
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Férias de Final de Ano"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo *
                </label>
                <Select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as BloqueioTemporario['tipo'])}
                  required
                >
                  <option value="ferias">Férias</option>
                  <option value="feriado">Feriado</option>
                  <option value="manutencao">Manutenção</option>
                  <option value="evento">Evento</option>
                  <option value="outros">Outros</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição adicional do bloqueio..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Período */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-primary flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span>Período</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data de Início *
                </label>
                <Input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data de Fim *
                </label>
                <Input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={diaInteiro}
                  onChange={(e) => setDiaInteiro(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                />
                <span className="text-gray-300">Dia inteiro</span>
              </label>

              {!diaInteiro && (
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hora de Início
                    </label>
                    <Input
                      type="time"
                      value={horaInicio}
                      onChange={(e) => setHoraInicio(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hora de Fim
                    </label>
                    <Input
                      type="time"
                      value={horaFim}
                      onChange={(e) => setHoraFim(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Barbeiros */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-primary flex items-center space-x-2">
              <Users className="h-5 w-5 text-yellow-500" />
              <span>Aplicar Bloqueio</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={aplicarTodaBarbearia}
                  onChange={(e) => setAplicarTodaBarbearia(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                />
                <span className="text-gray-300">Aplicar a toda barbearia</span>
              </label>

              {!aplicarTodaBarbearia && (
                <div className="ml-6 space-y-2">
                  <p className="text-sm text-gray-400 mb-3">
                    Selecione os barbeiros afetados pelo bloqueio:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {barbeiros.map((barbeiro) => (
                      <label
                        key={barbeiro.id}
                        className="flex items-center space-x-3 p-2 border border-gray-600 rounded cursor-pointer hover:border-gray-500 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={barbeirosSelecionados.includes(barbeiro.id)}
                          onChange={() => toggleBarbeiro(barbeiro.id)}
                          className="rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="text-gray-300">{barbeiro.nome}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onCancelar}
              disabled={loading}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancelar
            </Button>
            
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
                  {bloqueioId ? 'Atualizar' : 'Criar'} Bloqueio
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}