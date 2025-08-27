'use client'

import { useState } from 'react'
import { Search, Clock, DollarSign, Filter, Scissors, Users } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { ServicoBooking, FiltrosServico } from '../../types/booking'

interface ServiceSelectorProps {
  servicos: ServicoBooking[]
  servicoSelecionado?: ServicoBooking
  loading: boolean
  onSelecionarServico: (servico: ServicoBooking) => void
  onFiltrar: (filtros: FiltrosServico) => void
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
  servicos,
  servicoSelecionado,
  loading,
  onSelecionarServico,
  onFiltrar
}: ServiceSelectorProps) {
  const [filtros, setFiltros] = useState<FiltrosServico>({})
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const handleBusca = (busca: string) => {
    const novosFiltros = { ...filtros, busca }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const handleFiltroCategoria = (categoria: 'corte' | 'barba' | 'combo' | 'outros' | '') => {
    const novosFiltros = { ...filtros, categoria: categoria || undefined }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const handleFiltroPreco = (precoMin?: number, precoMax?: number) => {
    const novosFiltros = { ...filtros, precoMin, precoMax }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const handleFiltroDuracao = (duracaoMax?: number) => {
    const novosFiltros = { ...filtros, duracaoMax }
    setFiltros(novosFiltros)
    onFiltrar(novosFiltros)
  }

  const limparFiltros = () => {
    setFiltros({})
    onFiltrar({})
  }

  const formatarPreco = (preco: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const formatarDuracao = (duracao: number) => {
    if (duracao < 60) {
      return `${duracao} min`
    }
    const horas = Math.floor(duracao / 60)
    const minutos = duracao % 60
    return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Escolha um Serviço
        </h2>
        <p className="text-gray-400">
          Selecione o serviço que deseja agendar
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar serviços..."
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

        {/* Filtros rápidos por categoria */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={!filtros.categoria ? "primary" : "outline"}
            size="sm"
            onClick={() => handleFiltroCategoria('')}
            className={!filtros.categoria ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
          >
            Todos
          </Button>
          {Object.entries(categoriaLabels).map(([categoria, label]) => (
            <Button
              key={categoria}
              variant={filtros.categoria === categoria ? "primary" : "outline"}
              size="sm"
              onClick={() => handleFiltroCategoria(categoria as 'corte' | 'barba' | 'combo' | 'outros')}
              className={filtros.categoria === categoria ? "bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
            >
              {label}
            </Button>
          ))}
        </div>

        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preço mínimo
              </label>
              <select
                value={filtros.precoMin || ''}
                onChange={(e) => handleFiltroPreco(Number(e.target.value) || undefined, filtros.precoMax)}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Qualquer valor</option>
                <option value="20">R$ 20,00</option>
                <option value="30">R$ 30,00</option>
                <option value="40">R$ 40,00</option>
                <option value="50">R$ 50,00</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preço máximo
              </label>
              <select
                value={filtros.precoMax || ''}
                onChange={(e) => handleFiltroPreco(filtros.precoMin, Number(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Qualquer valor</option>
                <option value="30">Até R$ 30,00</option>
                <option value="40">Até R$ 40,00</option>
                <option value="50">Até R$ 50,00</option>
                <option value="60">Até R$ 60,00</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duração máxima
              </label>
              <select
                value={filtros.duracaoMax || ''}
                onChange={(e) => handleFiltroDuracao(Number(e.target.value) || undefined)}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Qualquer duração</option>
                <option value="30">Até 30 min</option>
                <option value="45">Até 45 min</option>
                <option value="60">Até 1 hora</option>
                <option value="90">Até 1h 30min</option>
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

      {/* Lista de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                <div className="w-full h-32 bg-gray-600 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-full"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))
        ) : servicos.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <Scissors className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">
              Nenhum serviço encontrado
            </p>
            <p className="text-sm text-gray-500">
              Tente ajustar os filtros de busca
            </p>
          </div>
        ) : (
          servicos.map((servico) => {
            const IconeCategoria = categoriaIcons[servico.categoria]
            const isSelected = servicoSelecionado?.id === servico.id

            return (
              <div
                key={servico.id}
                className={`bg-gray-800 rounded-lg border transition-all cursor-pointer hover:border-gray-500 ${
                  isSelected
                    ? 'border-yellow-500 bg-gray-700/50'
                    : 'border-gray-700'
                }`}
                onClick={() => onSelecionarServico(servico)}
              >
                <div className="p-6">
                  {/* Imagem do serviço */}
                  <div className="w-full h-32 bg-gray-600 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {servico.imagem ? (
                      <img
                        src={servico.imagem}
                        alt={servico.nome}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <IconeCategoria className="h-12 w-12 text-gray-400" />
                    )}
                  </div>

                  {/* Informações do serviço */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        {servico.nome}
                      </h3>
                      {isSelected && (
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center ml-2">
                          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2">
                      {servico.descricao}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-400">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-semibold">
                          {formatarPreco(servico.preco)}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {formatarDuracao(servico.duracao)}
                        </span>
                      </div>
                    </div>

                    {/* Categoria */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                        <IconeCategoria className="h-3 w-3 mr-1" />
                        {categoriaLabels[servico.categoria]}
                      </span>

                      {servico.barbeiros.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {servico.barbeiros.length} barbeiro{servico.barbeiros.length > 1 ? 's' : ''} disponível{servico.barbeiros.length > 1 ? 'is' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Botão de continuar */}
      {servicoSelecionado && (
        <div className="flex justify-center pt-4">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8">
            Continuar para Barbeiros
          </Button>
        </div>
      )}
    </div>
  )
}