'use client'

import { useState, useEffect } from 'react'
import { Search, Clock, DollarSign, Filter, Scissors, Users } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Loading } from '@/shared/components/ui/Loading'
import { ServicoBooking, FiltrosServico, Barbearia } from '../types/booking'

interface ServiceSelectorProps {
  barbearia: Barbearia
  servicos: ServicoBooking[]
  loading: boolean
  onSelect: (servico: ServicoBooking) => void
  onLoadServicos: (barbeariaId: string, filtros?: FiltrosServico) => void
  selectedServico?: ServicoBooking
}

const categoriaIcons = {
  corte: Scissors,
  barba: Users,
  combo: Users,
  outros: Scissors
}

const categoriaLabels = {
  corte: 'Corte',
  barba: 'Barba',
  combo: 'Combo',
  outros: 'Outros'
}

export function ServiceSelector({
  barbearia,
  servicos,
  loading,
  onSelect,
  onLoadServicos,
  selectedServico
}: ServiceSelectorProps) {
  const [filtros, setFiltros] = useState<FiltrosServico>({})
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  useEffect(() => {
    onLoadServicos(barbearia.id)
  }, [barbearia.id, onLoadServicos])

  const handleBuscar = () => {
    onLoadServicos(barbearia.id, filtros)
  }

  const handleLimparFiltros = () => {
    setFiltros({})
    onLoadServicos(barbearia.id)
  }

  const handleFiltroCategoria = (categoria: 'corte' | 'barba' | 'combo' | 'outros') => {
    const novosFiltros = {
      ...filtros,
      categoria: filtros.categoria === categoria ? undefined : categoria
    }
    setFiltros(novosFiltros)
    onLoadServicos(barbearia.id, novosFiltros)
  }

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const formatarDuracao = (duracao: number) => {
    const horas = Math.floor(duracao / 60)
    const minutos = duracao % 60
    
    if (horas > 0) {
      return `${horas}h${minutos > 0 ? ` ${minutos}min` : ''}`
    }
    return `${minutos}min`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Escolha um Serviço
        </h2>
        <p className="text-gray-400">
          Serviços disponíveis na {barbearia.nome}
        </p>
      </div>

      {/* Filtros Rápidos por Categoria */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Object.entries(categoriaLabels).map(([categoria, label]) => {
          const Icon = categoriaIcons[categoria as keyof typeof categoriaIcons]
          const isActive = filtros.categoria === categoria
          
          return (
            <Button
              key={categoria}
              onClick={() => handleFiltroCategoria(categoria as any)}
              variant={isActive ? "default" : "outline"}
              className={isActive 
                ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
                : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Button>
          )
        })}
      </div>

      {/* Filtros Avançados */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar serviços..."
              value={filtros.busca || ''}
              onChange={(e) => setFiltros(prev => ({ ...prev, busca: e.target.value }))}
              className="bg-gray-700 border-gray-600 text-white"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button
            onClick={handleBuscar}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
          >
            Buscar
          </Button>
        </div>

        {/* Filtros Avançados */}
        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preço Mínimo (R$)
              </label>
              <Input
                type="number"
                placeholder="Ex: 20"
                value={filtros.precoMin || ''}
                onChange={(e) => setFiltros(prev => ({ 
                  ...prev, 
                  precoMin: e.target.value ? Number(e.target.value) : undefined 
                }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preço Máximo (R$)
              </label>
              <Input
                type="number"
                placeholder="Ex: 100"
                value={filtros.precoMax || ''}
                onChange={(e) => setFiltros(prev => ({ 
                  ...prev, 
                  precoMax: e.target.value ? Number(e.target.value) : undefined 
                }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duração Máxima (min)
              </label>
              <Input
                type="number"
                placeholder="Ex: 60"
                value={filtros.duracaoMax || ''}
                onChange={(e) => setFiltros(prev => ({ 
                  ...prev, 
                  duracaoMax: e.target.value ? Number(e.target.value) : undefined 
                }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <Button
                onClick={handleLimparFiltros}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Lista de Serviços */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : servicos.length === 0 ? (
        <div className="text-center py-8">
          <Scissors className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">
            Nenhum serviço encontrado
          </p>
          <p className="text-sm text-gray-500">
            Tente ajustar os filtros de busca
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico) => {
            const Icon = categoriaIcons[servico.categoria]
            
            return (
              <div
                key={servico.id}
                className={`bg-gray-800 rounded-lg border transition-all cursor-pointer ${
                  selectedServico?.id === servico.id
                    ? 'border-yellow-500 ring-2 ring-yellow-500/20'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => onSelect(servico)}
              >
                {/* Imagem */}
                <div className="aspect-video bg-gray-700 rounded-t-lg relative overflow-hidden">
                  {servico.imagem ? (
                    <img
                      src={servico.imagem}
                      alt={servico.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  
                  {/* Badge de categoria */}
                  <div className="absolute top-3 left-3 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                    {categoriaLabels[servico.categoria]}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {servico.nome}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {servico.descricao}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    {/* Preço */}
                    <div className="flex items-center text-yellow-500">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-bold text-lg">
                        {formatarPreco(servico.preco)}
                      </span>
                    </div>

                    {/* Duração */}
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatarDuracao(servico.duracao)}
                    </div>
                  </div>

                  {/* Barbeiros disponíveis */}
                  {servico.barbeiros.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">
                        Barbeiros disponíveis:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {servico.barbeiros.slice(0, 3).map((barbeiro) => (
                          <span
                            key={barbeiro.id}
                            className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                          >
                            {barbeiro.nome}
                          </span>
                        ))}
                        {servico.barbeiros.length > 3 && (
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            +{servico.barbeiros.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Botão de seleção */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelect(servico)
                    }}
                    className={`w-full ${
                      selectedServico?.id === servico.id
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {selectedServico?.id === servico.id ? 'Selecionado' : 'Selecionar'}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}