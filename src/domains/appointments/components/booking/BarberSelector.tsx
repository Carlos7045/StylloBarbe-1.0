'use client'

import { useState } from 'react'
import { Star, Filter, User, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { BarbeiroBooking, FiltrosBarbeiro } from '../../types/booking'

interface BarberSelectorProps {
  barbeiros: BarbeiroBooking[]
  barbeiroSelecionado?: BarbeiroBooking | 'qualquer'
  loading: boolean
  onSelecionarBarbeiro: (barbeiro: BarbeiroBooking | 'qualquer') => void
  onFiltrar: (filtros: FiltrosBarbeiro) => void
}

export function BarberSelector({
  barbeiros,
  barbeiroSelecionado,
  loading,
  onSelecionarBarbeiro,
  onFiltrar
}: BarberSelectorProps) {
  const [filtros, setFiltros] = useState<FiltrosBarbeiro>({})
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const handleFiltroEspecialidade = (especialidade: string) => {
    const novosFiltros = { ...filtros, especialidade: especialidade || undefined }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const handleFiltroAvaliacao = (avaliacaoMinima: number) => {
    const novosFiltros = { ...filtros, avaliacaoMinima }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const handleFiltroDisponibilidade = (disponivel: boolean) => {
    const novosFiltros = { ...filtros, disponivel }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const limparFiltros = () => {
    setFiltros({})
    onFiltrar({})
  }

  // Obter todas as especialidades únicas
  const especialidadesUnicas = Array.from(
    new Set(barbeiros.flatMap(b => b.especialidades))
  ).sort()

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
          Selecione seu barbeiro preferido ou deixe que escolhamos o melhor disponível
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Especialidade
              </label>
              <select
                value={filtros.especialidade || ''}
                onChange={(e) => handleFiltroEspecialidade(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Todas as especialidades</option>
                {especialidadesUnicas.map(esp => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Disponibilidade
              </label>
              <select
                value={filtros.disponivel !== undefined ? (filtros.disponivel ? 'true' : 'false') : ''}
                onChange={(e) => handleFiltroDisponibilidade(e.target.value === 'true')}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Todos</option>
                <option value="true">Apenas disponíveis</option>
                <option value="false">Apenas indisponíveis</option>
              </select>
            </div>

            <div className="md:col-span-3">
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

      {/* Opção "Qualquer barbeiro" */}
      <div
        className={`bg-gray-800 rounded-lg border transition-all cursor-pointer hover:border-gray-500 ${
          barbeiroSelecionado === 'qualquer'
            ? 'border-yellow-500 bg-gray-700/50'
            : 'border-gray-700'
        }`}
        onClick={() => onSelecionarBarbeiro('qualquer')}
      >
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Users className="h-8 w-8 text-gray-900" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">
                  Qualquer barbeiro disponível
                </h3>
                {barbeiroSelecionado === 'qualquer' && (
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                  </div>
                )}
              </div>

              <p className="text-gray-400 text-sm mb-2">
                Deixe que escolhemos o melhor barbeiro disponível para você
              </p>

              <div className="flex items-center text-sm text-green-400">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Maior chance de horários disponíveis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Barbeiros */}
      <div className="space-y-6">
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
        ) : (
          <>
            {/* Barbeiros Disponíveis */}
            {barbeirosDisponiveis.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Barbeiros Disponíveis ({barbeirosDisponiveis.length})
                </h3>
                
                <div className="space-y-4">
                  {barbeirosDisponiveis.map((barbeiro) => {
                    const isSelected = barbeiroSelecionado === barbeiro

                    return (
                      <div
                        key={barbeiro.id}
                        className={`bg-gray-800 rounded-lg border transition-all cursor-pointer hover:border-gray-500 ${
                          isSelected
                            ? 'border-yellow-500 bg-gray-700/50'
                            : 'border-gray-700'
                        }`}
                        onClick={() => onSelecionarBarbeiro(barbeiro)}
                      >
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            {/* Foto do barbeiro */}
                            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                              {barbeiro.foto ? (
                                <img
                                  src={barbeiro.foto}
                                  alt={barbeiro.nome}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="h-8 w-8 text-gray-400" />
                              )}
                            </div>

                            {/* Informações do barbeiro */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="text-lg font-semibold text-white">
                                  {barbeiro.nome}
                                </h4>
                                {isSelected && (
                                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center ml-2">
                                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                                  </div>
                                )}
                              </div>

                              {/* Avaliação */}
                              {barbeiro.avaliacao && (
                                <div className="flex items-center mb-2">
                                  <div className="flex items-center text-yellow-500 mr-4">
                                    <Star className="h-4 w-4 mr-1 fill-current" />
                                    <span className="text-white font-medium">
                                      {barbeiro.avaliacao.toFixed(1)}
                                    </span>
                                    <span className="text-gray-400 ml-1 text-sm">
                                      ({barbeiro.totalAvaliacoes} avaliações)
                                    </span>
                                  </div>
                                  <div className="flex items-center text-green-400">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    <span className="text-sm">Disponível</span>
                                  </div>
                                </div>
                              )}

                              {/* Especialidades */}
                              <div className="flex flex-wrap gap-2">
                                {barbeiro.especialidades.map((especialidade, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                                  >
                                    {especialidade}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Barbeiros Indisponíveis */}
            {barbeirosIndisponiveis.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-400 mb-4 flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  Barbeiros Indisponíveis ({barbeirosIndisponiveis.length})
                </h3>
                
                <div className="space-y-4">
                  {barbeirosIndisponiveis.map((barbeiro) => (
                    <div
                      key={barbeiro.id}
                      className="bg-gray-800 rounded-lg border border-gray-700 opacity-60"
                    >
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Foto do barbeiro */}
                          <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                            {barbeiro.foto ? (
                              <img
                                src={barbeiro.foto}
                                alt={barbeiro.nome}
                                className="w-full h-full object-cover grayscale"
                              />
                            ) : (
                              <User className="h-8 w-8 text-gray-500" />
                            )}
                          </div>

                          {/* Informações do barbeiro */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-lg font-semibold text-gray-400">
                                {barbeiro.nome}
                              </h4>
                              <span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded-full">
                                Indisponível
                              </span>
                            </div>

                            {/* Avaliação */}
                            {barbeiro.avaliacao && (
                              <div className="flex items-center mb-2">
                                <div className="flex items-center text-gray-500">
                                  <Star className="h-4 w-4 mr-1 fill-current" />
                                  <span className="text-gray-400 font-medium">
                                    {barbeiro.avaliacao.toFixed(1)}
                                  </span>
                                  <span className="text-gray-500 ml-1 text-sm">
                                    ({barbeiro.totalAvaliacoes} avaliações)
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Especialidades */}
                            <div className="flex flex-wrap gap-2">
                              {barbeiro.especialidades.map((especialidade, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-400"
                                >
                                  {especialidade}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Estado vazio */}
            {barbeiros.length === 0 && !loading && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">
                  Nenhum barbeiro encontrado
                </p>
                <p className="text-sm text-gray-500">
                  Tente ajustar os filtros de busca
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Botão de continuar */}
      {barbeiroSelecionado && (
        <div className="flex justify-center pt-4">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8">
            Continuar para Horários
          </Button>
        </div>
      )}
    </div>
  )
}