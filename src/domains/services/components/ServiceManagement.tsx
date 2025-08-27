'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Package, DollarSign, Clock, Tag } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { useServices } from '../hooks/useServices'
import { ServiceList } from './ServiceList'
import { ServiceForm } from './ServiceForm'
import { ServiceFilters } from './ServiceFilters'
import { FiltrosServicos } from '../types/service'

interface ServiceManagementProps {
  barbeariaId: string
}

export function ServiceManagement({ barbeariaId }: ServiceManagementProps) {
  const {
    servicos,
    barbeiros,
    estatisticas,
    loading,
    error,
    filtros,
    criarServico,
    atualizarServico,
    alterarStatus,
    excluirServico,
    aplicarFiltros,
    limparFiltros
  } = useServices(barbeariaId)

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [servicoEditando, setServicoEditando] = useState<string | null>(null)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [busca, setBusca] = useState('')

  // Aplicar busca
  const handleBusca = (termo: string) => {
    setBusca(termo)
    aplicarFiltros({ ...filtros, busca: termo })
  }

  // Aplicar filtros
  const handleFiltros = (novosFiltros: FiltrosServicos) => {
    aplicarFiltros({ ...novosFiltros, busca })
  }

  return (
    <div className="space-y-8">
      {/* Botão Novo Serviço - Posicionado no topo */}
      <div className="flex justify-end">
        <Button 
          onClick={() => setMostrarFormulario(true)}
          className="btn-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Serviço
        </Button>
      </div>

      <div className="space-y-8">
        {/* Métricas */}
        {estatisticas && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-500/20 rounded">
                  <Package className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-primary mb-1">{estatisticas.totalServicos}</p>
                <p className="text-sm text-theme-secondary">Total de Serviços</p>
                <p className="text-xs text-theme-tertiary mt-1">{estatisticas.servicosAtivos} ativos</p>
              </div>
            </div>

            <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-500/20 rounded">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-primary mb-1">
                  R$ {estatisticas.precoMedio?.toFixed(2) || '0,00'}
                </p>
                <p className="text-sm text-theme-secondary">Preço Médio</p>
              </div>
            </div>

            <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-500/20 rounded">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-primary mb-1">
                  {Math.round(estatisticas.duracaoMedia || 0)}min
                </p>
                <p className="text-sm text-theme-secondary">Duração Média</p>
              </div>
            </div>

            <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/20 rounded">
                  <Tag className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-theme-primary mb-1">
                  {estatisticas.servicosPorCategoria?.corte || 0}
                </p>
                <p className="text-sm text-theme-secondary">Serviços de Corte</p>
              </div>
            </div>
          </div>
        )}

        {/* Controles */}
        <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-tertiary h-5 w-5" />
                <Input
                  placeholder="Buscar serviços..."
                  value={busca}
                  onChange={(e) => handleBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="btn-secondary"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              
              {Object.keys(filtros).length > 0 && (
                <Button
                  variant="ghost"
                  onClick={limparFiltros}
                  className="text-theme-tertiary hover:text-theme-primary"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          </div>

          {/* Filtros */}
          {mostrarFiltros && (
            <div className="mt-4 pt-4 border-t border-theme-primary">
              <ServiceFilters
                filtros={filtros}
                barbeiros={barbeiros}
                onFiltrosChange={handleFiltros}
              />
            </div>
          )}
        </div>

        {/* Lista de Serviços */}
        <ServiceList
          servicos={servicos}
          loading={loading}
          error={error}
          onEditar={(id) => {
            setServicoEditando(id)
            setMostrarFormulario(true)
          }}
          onAlterarStatus={alterarStatus}
          onExcluir={excluirServico}
        />
      </div>

      {/* Modal do Formulário */}
      {mostrarFormulario && (
        <ServiceForm
          servicoId={servicoEditando}
          barbeiros={barbeiros}
          onSalvar={servicoEditando ? atualizarServico : criarServico}
          onCancelar={() => {
            setMostrarFormulario(false)
            setServicoEditando(null)
          }}
        />
      )}
    </div>
  )
}