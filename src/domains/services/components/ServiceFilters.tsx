'use client'

import { Input } from '@/shared/components/ui/Input'
import { Select } from '@/shared/components/ui/Select'
import { FiltrosServicos } from '../types/service'

interface ServiceFiltersProps {
  filtros: FiltrosServicos
  barbeiros: { id: string; nome: string }[]
  onFiltrosChange: (filtros: FiltrosServicos) => void
}

export function ServiceFilters({ 
  filtros, 
  barbeiros, 
  onFiltrosChange 
}: ServiceFiltersProps) {
  
  const handleChange = (campo: keyof FiltrosServicos, valor: string | number) => {
    const novosFiltros = {
      ...filtros,
      [campo]: valor || undefined
    }
    onFiltrosChange(novosFiltros)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Filtro por Categoria */}
      <div>
        <label className="block text-sm font-medium text-theme-secondary mb-2">
          Categoria
        </label>
        <Select
          value={filtros.categoria || ''}
          onChange={(value) => handleChange('categoria', value)}
          className="w-full"
        >
          <option value="">Todas as categorias</option>
          <option value="corte">Corte</option>
          <option value="barba">Barba</option>
          <option value="combo">Combo</option>
          <option value="outros">Outros</option>
        </Select>
      </div>

      {/* Filtro por Status */}
      <div>
        <label className="block text-sm font-medium text-theme-secondary mb-2">
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
        </Select>
      </div>

      {/* Filtro por Barbeiro */}
      <div>
        <label className="block text-sm font-medium text-theme-secondary mb-2">
          Barbeiro
        </label>
        <Select
          value={filtros.barbeiroId || ''}
          onChange={(value) => handleChange('barbeiroId', value)}
          className="w-full"
        >
          <option value="">Todos os barbeiros</option>
          {barbeiros.map((barbeiro) => (
            <option key={barbeiro.id} value={barbeiro.id}>
              {barbeiro.nome}
            </option>
          ))}
        </Select>
      </div>

      {/* Filtro por Preço */}
      <div>
        <label className="block text-sm font-medium text-theme-secondary mb-2">
          Preço Máximo
        </label>
        <Input
          type="number"
          placeholder="R$ 0,00"
          value={filtros.precoMax || ''}
          onChange={(e) => handleChange('precoMax', parseFloat(e.target.value) || undefined)}
          min="0"
          step="0.01"
        />
      </div>
    </div>
  )
}