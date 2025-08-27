'use client'

import { useState } from 'react'
import { Edit, Trash2, Calendar, Clock, Users } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { BloqueioTemporario } from '../../types/schedule'

interface TemporaryBlocksProps {
  bloqueios: BloqueioTemporario[]
  barbeiros: { id: string; nome: string }[]
  onEditar: (id: string) => void
  onExcluir: (id: string) => Promise<void>
}

export function TemporaryBlocks({ bloqueios, barbeiros, onEditar, onExcluir }: TemporaryBlocksProps) {
  const [processando, setProcessando] = useState<string | null>(null)

  const handleExcluir = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este bloqueio?')) {
      try {
        setProcessando(id)
        await onExcluir(id)
      } catch (error) {
        console.error('Erro ao excluir bloqueio:', error)
      } finally {
        setProcessando(null)
      }
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'ferias':
        return 'text-blue-400 bg-blue-500/20'
      case 'feriado':
        return 'text-green-400 bg-green-500/20'
      case 'manutencao':
        return 'text-orange-400 bg-orange-500/20'
      case 'evento':
        return 'text-purple-400 bg-purple-500/20'
      default:
        return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'ferias':
        return 'Férias'
      case 'feriado':
        return 'Feriado'
      case 'manutencao':
        return 'Manutenção'
      case 'evento':
        return 'Evento'
      default:
        return 'Outros'
    }
  }

  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR')
  }

  const formatarPeriodo = (bloqueio: BloqueioTemporario) => {
    const dataInicio = formatarData(bloqueio.dataInicio)
    const dataFim = formatarData(bloqueio.dataFim)
    
    if (dataInicio === dataFim) {
      if (bloqueio.horaInicio && bloqueio.horaFim) {
        return `${dataInicio} das ${bloqueio.horaInicio} às ${bloqueio.horaFim}`
      }
      return `${dataInicio} (dia todo)`
    }
    
    return `${dataInicio} até ${dataFim}`
  }

  const getBarbeirosNomes = (barbeiroIds: string[]) => {
    if (barbeiroIds.length === 0) return 'Toda a barbearia'
    
    const nomes = barbeiroIds
      .map(id => barbeiros.find(b => b.id === id)?.nome)
      .filter(Boolean)
    
    return nomes.join(', ')
  }

  const bloqueiosAtivos = bloqueios.filter(b => b.ativo)
  const bloqueiosInativos = bloqueios.filter(b => !b.ativo)

  return (
    <div className="space-y-6">
      {/* Bloqueios Ativos */}
      <div className="bg-theme-secondary rounded-lg border border-theme-primary">
        <div className="p-6 border-b border-theme-primary">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-yellow-500" />
            <div>
              <h2 className="text-xl font-semibold text-theme-primary">
                Bloqueios Ativos
              </h2>
              <p className="text-sm text-theme-secondary mt-1">
                {bloqueiosAtivos.length} bloqueio(s) ativo(s)
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {bloqueiosAtivos.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-theme-muted mx-auto mb-4" />
              <p className="text-theme-tertiary mb-4">
                Nenhum bloqueio ativo
              </p>
              <p className="text-sm text-theme-muted">
                Crie bloqueios para férias, feriados ou manutenções
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bloqueiosAtivos.map((bloqueio) => (
                <div
                  key={bloqueio.id}
                  className="border border-theme-secondary rounded-lg p-4 hover:border-theme-hover transition-colors bg-theme-tertiary"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {bloqueio.titulo}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(bloqueio.tipo)}`}>
                          {getTipoLabel(bloqueio.tipo)}
                        </span>
                      </div>

                      {bloqueio.descricao && (
                        <p className="text-gray-300 mb-3">{bloqueio.descricao}</p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Clock className="h-4 w-4 text-orange-400" />
                          <span>{formatarPeriodo(bloqueio)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Users className="h-4 w-4 text-purple-400" />
                          <span>{getBarbeirosNomes(bloqueio.barbeiroIds)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditar(bloqueio.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleExcluir(bloqueio.id)}
                        disabled={processando === bloqueio.id}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bloqueios Inativos */}
      {bloqueiosInativos.length > 0 && (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-gray-500" />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Bloqueios Inativos
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {bloqueiosInativos.length} bloqueio(s) inativo(s)
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {bloqueiosInativos.map((bloqueio) => (
                <div
                  key={bloqueio.id}
                  className="border border-gray-600 rounded-lg p-4 opacity-60"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {bloqueio.titulo}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(bloqueio.tipo)}`}>
                          {getTipoLabel(bloqueio.tipo)}
                        </span>
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-medium">
                          Inativo
                        </span>
                      </div>

                      <div className="text-sm text-gray-400">
                        {formatarPeriodo(bloqueio)}
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditar(bloqueio.id)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleExcluir(bloqueio.id)}
                        disabled={processando === bloqueio.id}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}