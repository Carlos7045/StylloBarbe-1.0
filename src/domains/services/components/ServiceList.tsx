'use client'

import { useState } from 'react'
import { 
  Edit, 
  Trash2, 
  MoreVertical, 
  Package, 
  DollarSign, 
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Tag
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { LoadingSpinner } from '@/shared/components/ui/Loading'
import { ServicoComBarbeiros, StatusServico } from '../types/service'

interface ServiceListProps {
  servicos: ServicoComBarbeiros[]
  loading: boolean
  error: string | null
  onEditar: (id: string) => void
  onAlterarStatus: (id: string, status: StatusServico) => Promise<void>
  onExcluir: (id: string) => Promise<void>
}

export function ServiceList({
  servicos,
  loading,
  error,
  onEditar,
  onAlterarStatus,
  onExcluir
}: ServiceListProps) {
  const [menuAberto, setMenuAberto] = useState<string | null>(null)
  const [processando, setProcessando] = useState<string | null>(null)

  const handleAlterarStatus = async (id: string, status: StatusServico) => {
    try {
      setProcessando(id)
      await onAlterarStatus(id, status)
      setMenuAberto(null)
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    } finally {
      setProcessando(null)
    }
  }

  const handleExcluir = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        setProcessando(id)
        await onExcluir(id)
        setMenuAberto(null)
      } catch (error) {
        console.error('Erro ao excluir serviço:', error)
      } finally {
        setProcessando(null)
      }
    }
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'corte':
        return 'text-blue-400 bg-blue-500/20'
      case 'barba':
        return 'text-green-400 bg-green-500/20'
      case 'combo':
        return 'text-purple-400 bg-purple-500/20'
      case 'outros':
        return 'text-orange-400 bg-orange-500/20'
      default:
        return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getCategoriaLabel = (categoria: string) => {
    switch (categoria) {
      case 'corte':
        return 'Corte'
      case 'barba':
        return 'Barba'
      case 'combo':
        return 'Combo'
      case 'outros':
        return 'Outros'
      default:
        return categoria
    }
  }

  const getStatusColor = (status: StatusServico) => {
    switch (status) {
      case 'ativo':
        return 'text-green-400 bg-green-500/20'
      case 'inativo':
        return 'text-red-400 bg-red-500/20'
    }
  }

  if (loading) {
    return (
      <div className="bg-theme-secondary rounded-lg border border-theme-primary p-8">
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-theme-secondary rounded-lg border border-theme-primary p-8">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  if (servicos.length === 0) {
    return (
      <div className="bg-theme-secondary rounded-lg border border-theme-primary p-8">
        <div className="text-center">
          <Package className="h-12 w-12 text-theme-muted mx-auto mb-4" />
          <p className="text-theme-tertiary mb-4">
            Nenhum serviço encontrado
          </p>
          <p className="text-sm text-theme-muted">
            Adicione serviços para começar a oferecer aos seus clientes
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      {/* Header */}
      <div className="p-6 border-b border-theme-primary">
        <div className="flex items-center space-x-3">
          <Package className="h-6 w-6 text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold text-theme-primary">
              Serviços
            </h2>
            <p className="text-sm text-theme-tertiary mt-1">
              {servicos.length} serviço(s) encontrado(s)
            </p>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="p-6 space-y-4">
        {servicos.map((servico) => (
          <div
            key={servico.id}
            className="border border-theme-primary rounded-lg p-4 hover:border-theme-hover transition-colors bg-theme-tertiary/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header do serviço */}
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-theme-primary">
                    {servico.nome}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(servico.status)}`}>
                    {servico.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoriaColor(servico.categoria)}`}>
                    {getCategoriaLabel(servico.categoria)}
                  </span>
                </div>

                {/* Descrição */}
                <p className="text-theme-secondary mb-4">{servico.descricao}</p>

                {/* Informações principais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-theme-secondary">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span className="font-semibold">R$ {servico.preco.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-theme-secondary">
                    <Clock className="h-4 w-4 text-orange-400" />
                    <span>{servico.duracao} minutos</span>
                  </div>
                  <div className="flex items-center space-x-2 text-theme-secondary">
                    <Users className="h-4 w-4 text-purple-400" />
                    <span>{servico.barbeiros.length} barbeiro(s)</span>
                  </div>
                </div>

                {/* Barbeiros */}
                {servico.barbeiros.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {servico.barbeiros.map((barbeiro) => (
                      <span
                        key={barbeiro.id}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                      >
                        {barbeiro.nome}
                      </span>
                    ))}
                  </div>
                )}

                {/* Observações */}
                {servico.observacoes && (
                  <div className="mt-3 p-3 bg-theme-tertiary/50 rounded">
                    <p className="text-sm text-theme-secondary">{servico.observacoes}</p>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="relative ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMenuAberto(menuAberto === servico.id ? null : servico.id)}
                  disabled={processando === servico.id}
                  className="text-theme-tertiary hover:text-theme-primary"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>

                {/* Menu de ações */}
                {menuAberto === servico.id && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-theme-secondary border border-theme-primary rounded-lg shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => onEditar(servico.id)}
                        className="w-full px-4 py-2 text-left text-sm text-theme-secondary hover:bg-theme-hover flex items-center space-x-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Editar</span>
                      </button>

                      {servico.status === 'ativo' ? (
                        <button
                          onClick={() => handleAlterarStatus(servico.id, 'inativo')}
                          className="w-full px-4 py-2 text-left text-sm text-theme-secondary hover:bg-theme-hover flex items-center space-x-2"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Desativar</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAlterarStatus(servico.id, 'ativo')}
                          className="w-full px-4 py-2 text-left text-sm text-theme-secondary hover:bg-theme-hover flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Ativar</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleExcluir(servico.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-theme-hover flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Excluir</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}