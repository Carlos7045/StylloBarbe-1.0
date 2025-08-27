'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Input } from '@/shared/components/ui/Input'

interface FilterOption {
  key: string
  label: string
  type: 'text' | 'number' | 'select'
  placeholder?: string
  options?: { value: string; label: string }[]
  min?: number
  max?: number
}

interface BookingFiltersProps {
  filters: Record<string, any>
  onFiltersChange: (filters: Record<string, any>) => void
  onSearch: () => void
  onClear: () => void
  searchPlaceholder?: string
  filterOptions?: FilterOption[]
  loading?: boolean
}

export function BookingFilters({
  filters,
  onFiltersChange,
  onSearch,
  onClear,
  searchPlaceholder = "Buscar...",
  filterOptions = [],
  loading = false
}: BookingFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters }
    
    if (value === '' || value === undefined || value === null) {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    
    onFiltersChange(newFilters)
  }

  const hasActiveFilters = Object.keys(filters).some(key => 
    key !== 'busca' && filters[key] !== undefined && filters[key] !== ''
  )

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      {/* Busca Principal */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder={searchPlaceholder}
            value={filters.busca || ''}
            onChange={(e) => handleFilterChange('busca', e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        
        {filterOptions.length > 0 && (
          <Button
            onClick={() => setShowAdvanced(!showAdvanced)}
            variant="outline"
            className={`border-gray-600 text-gray-300 hover:bg-gray-700 ${
              hasActiveFilters ? 'border-yellow-500 text-yellow-500' : ''
            }`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
            {hasActiveFilters && (
              <span className="ml-2 bg-yellow-500 text-gray-900 text-xs px-2 py-0.5 rounded-full">
                {Object.keys(filters).filter(key => 
                  key !== 'busca' && filters[key] !== undefined && filters[key] !== ''
                ).length}
              </span>
            )}
          </Button>
        )}
        
        <Button
          onClick={onSearch}
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>

      {/* Filtros Avançados */}
      {showAdvanced && filterOptions.length > 0 && (
        <div className="pt-4 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {filterOptions.map((option) => (
              <div key={option.key}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {option.label}
                </label>
                
                {option.type === 'text' && (
                  <Input
                    placeholder={option.placeholder}
                    value={filters[option.key] || ''}
                    onChange={(e) => handleFilterChange(option.key, e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                )}
                
                {option.type === 'number' && (
                  <Input
                    type="number"
                    placeholder={option.placeholder}
                    min={option.min}
                    max={option.max}
                    value={filters[option.key] || ''}
                    onChange={(e) => handleFilterChange(
                      option.key, 
                      e.target.value ? Number(e.target.value) : undefined
                    )}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                )}
                
                {option.type === 'select' && option.options && (
                  <select
                    value={filters[option.key] || ''}
                    onChange={(e) => handleFilterChange(option.key, e.target.value || undefined)}
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="">Todos</option>
                    {option.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
          
          {/* Ações dos Filtros */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {hasActiveFilters && (
                <span>
                  {Object.keys(filters).filter(key => 
                    key !== 'busca' && filters[key] !== undefined && filters[key] !== ''
                  ).length} filtro(s) ativo(s)
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button
                  onClick={onClear}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4 mr-2" />
                  Limpar Filtros
                </Button>
              )}
              
              <Button
                onClick={() => setShowAdvanced(false)}
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}