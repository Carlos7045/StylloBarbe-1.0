'use client'

import { useState } from 'react'
import { Plus, Search, Filter, Users, UserCheck, UserX } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'
import { useStaff } from '../../hooks/useStaff'
import { StaffList } from './StaffList'
import { StaffForm } from './StaffForm'
import { StaffFilters } from './StaffFilters'
import { FiltrosFuncionarios } from '../../types/staff'

interface StaffManagementProps {
  barbeariaId: string
}

export function StaffManagement({ barbeariaId }: StaffManagementProps) {
  const {
    funcionarios,
    especialidades,
    loading,
    error,
    filtros,
    criarFuncionario,
    atualizarFuncionario,
    alterarStatus,
    excluirFuncionario,
    aplicarFiltros,
    limparFiltros
  } = useStaff(barbeariaId)

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [funcionarioEditando, setFuncionarioEditando] = useState<string | null>(null)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [busca, setBusca] = useState('')

  // Estatísticas dos funcionários
  const totalFuncionarios = funcionarios.length
  const funcionariosAtivos = funcionarios.filter(f => f.status === 'ativo').length
  const barbeiros = funcionarios.filter(f => f.tipo === 'barbeiro').length

  // Aplicar busca
  const handleBusca = (termo: string) => {
    setBusca(termo)
    aplicarFiltros({ ...filtros, busca: termo })
  }

  // Aplicar filtros
  const handleFiltros = (novosFiltros: FiltrosFuncionarios) => {
    aplicarFiltros({ ...novosFiltros, busca })
  }

  return (
    <div className="space-y-8">
      {/* Botão Novo Funcionário - Posicionado no topo */}
      <div className="flex justify-end">
        <Button 
          onClick={() => setMostrarFormulario(true)}
          className="btn-primary"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Funcionário
        </Button>
      </div>

      <div className="space-y-8">
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/20 rounded">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-theme-primary mb-1">{totalFuncionarios}</p>
              <p className="text-sm text-theme-secondary">Total de Funcionários</p>
            </div>
          </div>

          <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-500/20 rounded">
                <UserCheck className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-theme-primary mb-1">{funcionariosAtivos}</p>
              <p className="text-sm text-theme-secondary">Funcionários Ativos</p>
            </div>
          </div>

          <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-500/20 rounded">
                <UserX className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-theme-primary mb-1">{barbeiros}</p>
              <p className="text-sm text-theme-secondary">Barbeiros</p>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="bg-theme-secondary rounded-lg border border-theme-primary p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-tertiary h-5 w-5" />
                <Input
                  placeholder="Buscar funcionários..."
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
              <StaffFilters
                filtros={filtros}
                especialidades={especialidades}
                onFiltrosChange={handleFiltros}
              />
            </div>
          )}
        </div>

        {/* Lista de Funcionários */}
        <StaffList
          funcionarios={funcionarios}
          loading={loading}
          error={error}
          onEditar={(id) => {
            setFuncionarioEditando(id)
            setMostrarFormulario(true)
          }}
          onAlterarStatus={alterarStatus}
          onExcluir={excluirFuncionario}
        />
      </div>

      {/* Modal do Formulário */}
      {mostrarFormulario && (
        <StaffForm
          funcionarioId={funcionarioEditando}
          especialidades={especialidades}
          onSalvar={funcionarioEditando ? atualizarFuncionario : criarFuncionario}
          onCancelar={() => {
            setMostrarFormulario(false)
            setFuncionarioEditando(null)
          }}
        />
      )}
    </div>
  )
}