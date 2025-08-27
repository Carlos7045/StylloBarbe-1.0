'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Clock, Filter } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Loading } from '@/shared/components/ui/Loading'
import { Barbearia, FiltrosBarbearia } from '../types/booking'

interface BarbershopSelectorProps {
  barbearias: Barbearia[]
  loading: boolean
  onSelect: (barbearia: Barbearia) => void
  onLoadBarbearias: (filtros?: FiltrosBarbearia) => void
  selectedBarbearia?: Barbearia
}

export function BarbershopSelector({
  barbearias,
  loading,
  onSelect,
  onLoadBarbearias,
  selectedBarbearia
}: BarbershopSelectorProps) {
  const [filtros, setFiltros] = useState<FiltrosBarbearia>({})
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  useEffect(() => {
    onLoadBarbearias()
  }, [onLoadBarbearias])

  const handleBuscar = () => {
    onLoadBarbearias(filtros)
  }

  const handleLimparFiltros = () => {
    setFiltros({})
    onLoadBarbearias()
  }

  const formatarDistancia = (distancia?: number) => {
    if (!distancia) return ''
    return distancia < 1 
      ? `${Math.round(distancia * 1000)}m`
      : `${distancia.toFixed(1)}km`
  }

  const formatarTempo = (tempo?: number) => {
    if (!tempo) return ''
    return `${tempo} min`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Escolha uma Barbearia
        </h2>
        <p className="text-gray-400">
          Selecione a barbearia mais próxima de você
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome ou localização..."
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
                Distância Máxima (km)
              </label>
              <Input
                type="number"
                placeholder="Ex: 10"
                value={filtros.distanciaMaxima || ''}
                onChange={(e) => setFiltros(prev => ({ 
                  ...prev, 
                  distanciaMaxima: e.target.value ? Number(e.target.value) : undefined 
                }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Avaliação Mínima
              </label>
              <select
                value={filtros.avaliacaoMinima || ''}
                onChange={(e) => setFiltros(prev => ({ 
                  ...prev, 
                  avaliacaoMinima: e.target.value ? Number(e.target.value) : undefined 
                }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Qualquer</option>
                <option value="4.5">4.5+ estrelas</option>
                <option value="4.0">4.0+ estrelas</option>
                <option value="3.5">3.5+ estrelas</option>
              </select>
            </div>
            <div className="flex items-end">
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

      {/* Lista de Barbearias */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : barbearias.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">
            Nenhuma barbearia encontrada
          </p>
          <p className="text-sm text-gray-500">
            Tente ajustar os filtros de busca
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barbearias.map((barbearia) => (
            <div
              key={barbearia.id}
              className={`bg-gray-800 rounded-lg border transition-all cursor-pointer ${
                selectedBarbearia?.id === barbearia.id
                  ? 'border-yellow-500 ring-2 ring-yellow-500/20'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
              onClick={() => onSelect(barbearia)}
            >
              {/* Imagem */}
              <div className="aspect-video bg-gray-700 rounded-t-lg relative overflow-hidden">
                {barbearia.logo ? (
                  <img
                    src={barbearia.logo}
                    alt={barbearia.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-gray-500" />
                  </div>
                )}
                
                {/* Badge de distância */}
                {barbearia.distancia && (
                  <div className="absolute top-3 right-3 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                    {formatarDistancia(barbearia.distancia)}
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {barbearia.nome}
                </h3>
                
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="truncate">{barbearia.endereco}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  {/* Avaliação */}
                  {barbearia.avaliacao && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-white font-medium">
                        {barbearia.avaliacao.toFixed(1)}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">
                        ({barbearia.totalAvaliacoes})
                      </span>
                    </div>
                  )}

                  {/* Tempo estimado */}
                  {barbearia.tempoEstimado && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatarTempo(barbearia.tempoEstimado)}
                    </div>
                  )}
                </div>

                {/* Botão de seleção */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(barbearia)
                  }}
                  className={`w-full ${
                    selectedBarbearia?.id === barbearia.id
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {selectedBarbearia?.id === barbearia.id ? 'Selecionada' : 'Selecionar'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}