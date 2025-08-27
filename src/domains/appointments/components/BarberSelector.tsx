'use client'

import { useState, useEffect } from 'react'
import { Search, Star, Filter, User, Users, Shuffle } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { Loading } from '@/shared/components/ui/Loading'
import { BarbeiroBooking, FiltrosBarbeiro, Barbearia, ServicoBooking } from '../types/booking'

interface BarberSelectorProps {
  barbearia: Barbearia
  servico: ServicoBooking
  barbeiros: BarbeiroBooking[]
  loading: boolean
  onSelect: (barbeiro: BarbeiroBooking | 'qualquer') => void
  onLoadBarbeiros: (barbeariaId: string, servicoId?: string, filtros?: FiltrosBarbeiro) => void
  selectedBarbeiro?: BarbeiroBooking | 'qualquer'
}

export function BarberSelector({
  barbearia,
  servico,
  barbeiros,
  loading,
  onSelect,
  onLoadBarbeiros,
  selectedBarbeiro
}: BarberSelectorProps) {
  const [filtros, setFiltros] = useState<FiltrosBarbeiro>({})
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  useEffect(() => {
    onLoadBarbeiros(barbearia.id, servico.id)
  }, [barbearia.id, servico.id, onLoadBarbeiros])

  const handleBuscar = () => {
    onLoadBarbeiros(barbearia.id, servico.id, filtros)
  }

  const handleLimparFiltros = () => {
    setFiltros({})
    onLoadBarbeiros(barbearia.id, servico.id)
  }

  const barbeirosDisponiveis = barbeiros.filter(b => b.disponivel)
  const barbeirosIndisponiveis = barbeiros.filter(b => !b.disponivel)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Escolha um Barbeiro
        </h2>
        <p className="text-gray-400">
          Barbeiros disponíveis para {servico.nome}
        </p>
      </div>

      {/* Opção "Qualquer Barbeiro" */}
      <div
        className={`bg-gray-800 rounded-lg border transition-all cursor-pointer p-6 ${
          selectedBarbeiro === 'qualquer'
            ? 'border-yellow-500 ring-2 ring-yellow-500/20'
            : 'border-gray-700 hover:border-gray-500'
        }`}
        onClick={() => onSelect('qualquer')}
      >
        <div className="flex items-center">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
            <Shuffle className="h-8 w-8 text-gray-900" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              Qualquer Barbeiro Disponível
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              Deixe o sistema escolher o melhor barbeiro disponível para você
            </p>
            <div className="flex items-center text-yellow-500 text-sm">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span>Melhor disponibilidade</span>
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onSelect('qualquer')
            }}
            className={`ml-4 ${
              selectedBarbeiro === 'qualquer'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {selectedBarbeiro === 'qualquer' ? 'Selecionado' : 'Selecionar'}
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar barbeiro por nome..."
              value={filtros.especialidade || ''}
              onChange={(e) => setFiltros(prev => ({ ...prev, especialidade: e.target.value }))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
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
                <option value="4.8">4.8+ estrelas</option>
                <option value="4.5">4.5+ estrelas</option>
                <option value="4.0">4.0+ estrelas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Disponibilidade
              </label>
              <select
                value={filtros.disponivel !== undefined ? filtros.disponivel.toString() : ''}
                onChange={(e) => setFiltros(prev => ({ 
                  ...prev, 
                  disponivel: e.target.value === '' ? undefined : e.target.value === 'true'
                }))}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Todos</option>
                <option value="true">Apenas disponíveis</option>
                <option value="false">Apenas indisponíveis</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end">
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

      {/* Lista de Barbeiros */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : barbeiros.length === 0 ? (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">
            Nenhum barbeiro encontrado
          </p>
          <p className="text-sm text-gray-500">
            Tente ajustar os filtros de busca
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Barbeiros Disponíveis */}
          {barbeirosDisponiveis.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-green-500" />
                Disponíveis ({barbeirosDisponiveis.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {barbeirosDisponiveis.map((barbeiro) => (
                  <div
                    key={barbeiro.id}
                    className={`bg-gray-800 rounded-lg border transition-all cursor-pointer p-4 ${
                      selectedBarbeiro && typeof selectedBarbeiro === 'object' && selectedBarbeiro.id === barbeiro.id
                        ? 'border-yellow-500 ring-2 ring-yellow-500/20'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => onSelect(barbeiro)}
                  >
                    <div className="flex items-center">
                      {/* Foto */}
                      <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        {barbeiro.foto ? (
                          <img
                            src={barbeiro.foto}
                            alt={barbeiro.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-500" />
                          </div>
                        )}
                      </div>

                      {/* Informações */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {barbeiro.nome}
                        </h4>
                        
                        {/* Avaliação */}
                        {barbeiro.avaliacao && (
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-white font-medium">
                              {barbeiro.avaliacao.toFixed(1)}
                            </span>
                            <span className="text-gray-400 text-sm ml-1">
                              ({barbeiro.totalAvaliacoes})
                            </span>
                          </div>
                        )}

                        {/* Especialidades */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {barbeiro.especialidades.slice(0, 2).map((especialidade) => (
                            <span
                              key={especialidade}
                              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                            >
                              {especialidade}
                            </span>
                          ))}
                          {barbeiro.especialidades.length > 2 && (
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                              +{barbeiro.especialidades.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Status */}
                        <div className="flex items-center text-green-500 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Disponível
                        </div>
                      </div>

                      {/* Botão */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelect(barbeiro)
                        }}
                        className={`ml-4 ${
                          selectedBarbeiro && typeof selectedBarbeiro === 'object' && selectedBarbeiro.id === barbeiro.id
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                        }`}
                      >
                        {selectedBarbeiro && typeof selectedBarbeiro === 'object' && selectedBarbeiro.id === barbeiro.id 
                          ? 'Selecionado' 
                          : 'Selecionar'
                        }
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Barbeiros Indisponíveis */}
          {barbeirosIndisponiveis.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-red-500" />
                Indisponíveis ({barbeirosIndisponiveis.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {barbeirosIndisponiveis.map((barbeiro) => (
                  <div
                    key={barbeiro.id}
                    className="bg-gray-800 rounded-lg border border-gray-700 p-4 opacity-60"
                  >
                    <div className="flex items-center">
                      {/* Foto */}
                      <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        {barbeiro.foto ? (
                          <img
                            src={barbeiro.foto}
                            alt={barbeiro.nome}
                            className="w-full h-full object-cover grayscale"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-500" />
                          </div>
                        )}
                      </div>

                      {/* Informações */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-300 mb-1">
                          {barbeiro.nome}
                        </h4>
                        
                        {/* Avaliação */}
                        {barbeiro.avaliacao && (
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 text-gray-500 fill-current mr-1" />
                            <span className="text-gray-400 font-medium">
                              {barbeiro.avaliacao.toFixed(1)}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">
                              ({barbeiro.totalAvaliacoes})
                            </span>
                          </div>
                        )}

                        {/* Status */}
                        <div className="flex items-center text-red-500 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          Indisponível
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}