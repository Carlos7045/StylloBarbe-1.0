'use client'

import { useState } from 'react'
import { Search, MapPin, Star, Clock, Filter } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Barbearia, FiltrosBarbearia } from '../../types/booking'

interface BarbershopSelectorProps {
  barbearias: Barbearia[]
  barbeariaSelecionada?: Barbearia
  loading: boolean
  onSelecionarBarbearia: (barbearia: Barbearia) => void
  onFiltrar: (filtros: FiltrosBarbearia) => void
}

export function BarbershopSelector({
  barbearias,
  barbeariaSelecionada,
  loading,
  onSelecionarBarbearia,
  onFiltrar
}: BarbershopSelectorProps) {
  const [filtros, setFiltros] = useState<FiltrosBarbearia>({})
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const handleBusca = (busca: string) => {
    const novosFiltros = { ...filtros, busca }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const handleFiltroDistancia = (distanciaMaxima: number) => {
    const novosFiltros = { ...filtros, distanciaMaxima }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const handleFiltroAvaliacao = (avaliacaoMinima: number) => {
    const novosFiltros = { ...filtros, avaliacaoMinima }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const limparFiltros = () => {
    setFiltros({})
    onFiltrar({})
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Escolha uma Barbearia
        </h2>
        <p className="text-gray-400">
          {barbearias.length > 0 && barbearias[0].redeId 
            ? `Barbearias da rede ${barbearias[0].nome.split(' - ')[0]} disponíveis para você`
            : 'Selecione a barbearia mais próxima de você'
          }
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome ou localização..."
              value={filtros.busca || ''}
              onChange={(e) => handleBusca(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Distância máxima (km)
              </label>
              <select
                value={filtros.distanciaMaxima || ''}
                onChange={(e) => handleFiltroDistancia(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Qualquer distância</option>
                <option value="2">Até 2 km</option>
                <option value="5">Até 5 km</option>
                <option value="10">Até 10 km</option>
                <option value="20">Até 20 km</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Avaliação mínima
              </label>
              <select
                value={filtros.avaliacaoMinima || ''}
                onChange={(e) => handleFiltroAvaliacao(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Qualquer avaliação</option>
                <option value="4">4+ estrelas</option>
                <option value="4.5">4.5+ estrelas</option>
                <option value="4.8">4.8+ estrelas</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Button
                variant="ghost"
                onClick={limparFiltros}
                className="text-gray-400 hover:text-white"
              >
                Limpar filtros
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Lista de Barbearias */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-600 rounded w-full"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
          barbearias.map((barbearia) => (
            <div
              key={barbearia.id}
              className={`bg-gray-800 rounded-lg border transition-all cursor-pointer hover:border-gray-500 ${
                barbeariaSelecionada?.id === barbearia.id
                  ? 'border-yellow-500 bg-gray-700/50'
                  : 'border-gray-700'
              }`}
              onClick={() => onSelecionarBarbearia(barbearia)}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Logo */}
                  <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                    {barbearia.logo ? (
                      <img
                        src={barbearia.logo}
                        alt={barbearia.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-gray-300">
                        {barbearia.nome.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Informações */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {barbearia.nome}
                      </h3>
                      {barbeariaSelecionada?.id === barbearia.id && (
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center ml-2">
                          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="truncate">{barbearia.endereco}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      {barbearia.avaliacao && (
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          <span className="text-white font-medium">
                            {barbearia.avaliacao.toFixed(1)}
                          </span>
                          <span className="text-gray-400 ml-1">
                            ({barbearia.totalAvaliacoes})
                          </span>
                        </div>
                      )}

                      {barbearia.distancia && (
                        <div className="flex items-center text-gray-400">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{barbearia.distancia.toFixed(1)} km</span>
                        </div>
                      )}

                      {barbearia.tempoEstimado && (
                        <div className="flex items-center text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{barbearia.tempoEstimado} min</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informações de contato */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{barbearia.telefone}</span>
                    <span className="text-gray-400">{barbearia.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botão de continuar */}
      {barbeariaSelecionada && (
        <div className="flex justify-center pt-4">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8">
            Continuar para Serviços
          </Button>
        </div>
      )}
    </div>
  )
}