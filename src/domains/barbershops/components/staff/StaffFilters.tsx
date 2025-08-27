'use client'

import { Select } from '@/shared/components/ui/Select'
import { FiltrosFuncionarios, Especialidade } from '../../types/staff'

interface StaffFiltersProps {
  filtros: FiltrosFuncionarios
  especialidades: Especialidade[]
  onFiltrosChange: (filtros: FiltrosFuncionarios) => void
}

export function StaffFilters({ 
  filtros, 
  especialidades, 
  onFiltrosChange 
}: StaffFiltersProps) {
  
  const handleChange = (campo: keyof FiltrosFuncionarios, valor: string) => {
    const novosFiltros = {
      ...filtros,
      [campo]: valor || undefined
    }
    onFiltrosChange(novosFiltros)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Filtro por Tipo */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tipo de Funcionário
        </label>
        <Select
          value={filtros.tipo || ''}
          onChange={(value) => handleChange('tipo', value)}
          className="w-full"
        >
          <option value="">Todos os tipos</option>
          <option value="barbeiro">Barbeiro</option>
          <option value="recepcionista">Recepcionista</option>
          <option value="admin_barbearia">Admin</option>
        </Select>
      </div>

      {/* Filtro por Status */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Status
        </label>
        <Select
          value={filtros.status || ''}
          onChange={(value) => handleChange('status', value)}
          className="w-full"
        >
          <option value="">Todos os status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="suspenso">Suspenso</option>
        </Select>
      </div>

      {/* Filtro por Especialidade */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Especialidade
        </label>
        <Select
          value={filtros.especialidade || ''}
          onChange={(value) => handleChange('especialidade', value)}
          className="w-full"
        >
          <option value="">Todas as especialidades</option>
          {especialidades.map((esp) => (
            <option key={esp.id} value={esp.id}>
              {esp.nome}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}