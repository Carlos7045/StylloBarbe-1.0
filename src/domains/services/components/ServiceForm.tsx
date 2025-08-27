'use client'

import { useState, useEffect } from 'react'
import { X, Save, Package, DollarSign, Clock, Users } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Select } from '@/shared/components/ui/Select'
import { 
  CriarServicoData, 
  AtualizarServicoData, 
  CategoriaServico
} from '../types/service'
import { ServiceService } from '../services/service.service'

interface ServiceFormProps {
  servicoId?: string | null
  barbeiros: { id: string; nome: string }[]
  onSalvar: (data: CriarServicoData | AtualizarServicoData) => Promise<any>
  onCancelar: () => void
}

export function ServiceForm({ 
  servicoId, 
  barbeiros, 
  onSalvar, 
  onCancelar 
}: ServiceFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Dados do formulário
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState<CategoriaServico>('corte')
  const [preco, setPreco] = useState('')
  const [duracao, setDuracao] = useState('')
  const [barbeirosSelecionados, setBarbeirosSelecionados] = useState<string[]>([])
  const [observacoes, setObservacoes] = useState('')

  // Carregar dados do serviço se estiver editando
  useEffect(() => {
    if (servicoId) {
      carregarServico()
    }
  }, [servicoId])

  const carregarServico = async () => {
    if (!servicoId) return
    
    try {
      setLoading(true)
      const servico = await ServiceService.obterServico(servicoId)
      
      if (servico) {
        setNome(servico.nome)
        setDescricao(servico.descricao)
        setCategoria(servico.categoria)
        setPreco(servico.preco.toString())
        setDuracao(servico.duracao.toString())
        setBarbeirosSelecionados(servico.barbeiroIds)
        setObservacoes(servico.observacoes || '')
      }
    } catch (err) {
      setError('Erro ao carregar dados do serviço')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nome.trim() || !descricao.trim() || !preco || !duracao) {
      setError('Preencha todos os campos obrigatórios')
      return
    }

    if (barbeirosSelecionados.length === 0) {
      setError('Selecione pelo menos um barbeiro para este serviço')
      return
    }

    const precoNumerico = parseFloat(preco)
    const duracaoNumerica = parseInt(duracao)

    if (precoNumerico <= 0) {
      setError('O preço deve ser maior que zero')
      return
    }

    if (duracaoNumerica <= 0) {
      setError('A duração deve ser maior que zero')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        categoria,
        preco: precoNumerico,
        duracao: duracaoNumerica,
        barbeiroIds: barbeirosSelecionados,
        observacoes: observacoes.trim() || undefined
      }

      await onSalvar(data)
      onCancelar()
    } catch (err) {
      setError('Erro ao salvar serviço')
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

  const formatarPreco = (valor: string) => {
    const numeros = valor.replace(/\D/g, '')
    const numero = parseFloat(numeros) / 100
    return numero.toFixed(2)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-secondary rounded-lg border border-theme-primary w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-theme-primary flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-theme-primary">
              {servicoId ? 'Editar Serviço' : 'Novo Serviço'}
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
              <Package className="h-5 w-5 text-yellow-500" />
              <span>Informações do Serviço</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Nome do Serviço *
                </label>
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Corte Masculino Tradicional"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Categoria *
                </label>
                <Select
                  value={categoria}
                  onChange={(value) => setCategoria(value as CategoriaServico)}
                  required
                >
                  <option value="corte">Corte</option>
                  <option value="barba">Barba</option>
                  <option value="combo">Combo</option>
                  <option value="outros">Outros</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Preço (R$) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-tertiary" />
                  <Input
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="0,00"
                    min="0"
                    step="0.01"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Duração (minutos) *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-theme-tertiary" />
                  <Input
                    type="number"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                    placeholder="30"
                    min="1"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Descrição *
                </label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o serviço oferecido..."
                  rows={3}
                  className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none placeholder:text-theme-muted"
                  required
                />
              </div>
            </div>
          </div>

          {/* Barbeiros */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-primary flex items-center space-x-2">
              <Users className="h-5 w-5 text-yellow-500" />
              <span>Barbeiros que Realizam este Serviço *</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {barbeiros.map((barbeiro) => (
                <label
                  key={barbeiro.id}
                  className="flex items-center space-x-3 p-3 border border-theme-primary rounded-lg cursor-pointer hover:border-theme-hover transition-colors bg-theme-tertiary/50"
                >
                  <input
                    type="checkbox"
                    checked={barbeirosSelecionados.includes(barbeiro.id)}
                    onChange={() => toggleBarbeiro(barbeiro.id)}
                    className="rounded border-theme-primary bg-theme-secondary text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="text-theme-secondary">{barbeiro.nome}</span>
                </label>
              ))}
            </div>

            {barbeiros.length === 0 && (
              <p className="text-theme-muted text-sm">
                Nenhum barbeiro cadastrado. Cadastre barbeiros primeiro.
              </p>
            )}
          </div>

          {/* Observações */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-theme-primary">
              Observações Adicionais
            </h3>
            
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Observações sobre o serviço, materiais necessários, etc..."
              rows={3}
              className="w-full px-3 py-2 border border-theme-primary bg-theme-secondary text-theme-primary rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none placeholder:text-theme-muted"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-theme-primary">
            <Button
              type="button"
              variant="outline"
              onClick={onCancelar}
              disabled={loading}
              className="btn-secondary"
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <>Salvando...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {servicoId ? 'Atualizar' : 'Criar'} Serviço
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}