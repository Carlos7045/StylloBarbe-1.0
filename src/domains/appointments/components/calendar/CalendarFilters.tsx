'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Select } from '@/shared/components/ui/Select'
import { Input } from '@/shared/components/ui/Input'
import { AppointmentFilters, AppointmentStatus } from '../../types/appointment'

interface CalendarFiltersProps {
  filters: AppointmentFilters
  onFiltersChange: (filters: AppointmentFilters) => void
  onClearFilters: () => void
}

const statusOptions = [
  { value: '', label: 'Todos os status' },
  { value: 'agendado', label: 'Agendado' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'em_andamento', label: 'Em Andamento' },
  { value: 'concluido', label: 'Concluído' },
  { value: 'cancelado', label: 'Cancelado' },
  { value: 'nao_compareceu', label: 'Não Compareceu' }
]

const barbeiroOptions = [
  { value: '', label: 'Todos os barbeiros' },
  { value: 'barber-1', label: 'Carlos Barbeiro' },
  { value: 'barber-2', label: 'Roberto Barbeiro' },
  { value: 'barber-3', label: 'João Barbeiro' }
]

const servicoOptions = [
  { value: '', label: 'Todos os serviços' },
  { value: 'service-1', label: 'Corte + Barba' },
  { value: 'service-2', label: 'Corte Simples' },
  { value: 'service-3', label: 'Barba' },
  { value: 'service-4', label: 'Corte Infantil' }
]

export function CalendarFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters 
}: CalendarFiltersProps) {
  const [localFilters, setLocalFilters] = useState<AppointmentFilters>(filters)

  const handleFilterChange = (key: keyof AppointmentFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value || undefined }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const formatDateForInput = (date?: Date) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const parseInputDate = (dateString: string) => {
    if (!dateString) return undefined
    return new Date(dateString + 'T00:00:00')
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== null
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Status
          </label>
          <Select
            value={filters.status || ''}
            onChange={(value) => handleFilterChange('status', value as AppointmentStatus)}
            className="bg-gray-700 border-gray-600 text-white"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Barbeiro */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Barbeiro
          </label>
          <Select
            value={filters.barbeiro || ''}
            onChange={(value) => handleFilterChange('barbeiro', value)}
            className="bg-gray-700 border-gray-600 text-white"
          >
            {barbeiroOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Serviço */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Serviço
          </label>
          <Select
            value={filters.servico || ''}
            onChange={(value) => handleFilterChange('servico', value)}
            className="bg-gray-700 border-gray-600 text-white"
          >
            {servicoOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Data Início */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Data Início
          </label>
          <Input
            type="date"
            value={formatDateForInput(filters.dataInicio)}
            onChange={(e) => handleFilterChange('dataInicio', parseInputDate(e.target.value))}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Data Fim */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Data Fim
          </label>
          <Input
            type="date"
            value={formatDateForInput(filters.dataFim)}
            onChange={(e) => handleFilterChange('dataFim', parseInputDate(e.target.value))}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        {/* Ações */}
        <div className="flex items-end space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          )}
        </div>
      </div>

      {/* Resumo dos filtros ativos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-700">
          <span className="text-sm text-gray-400">Filtros ativos:</span>
          
          {filters.status && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
              Status: {statusOptions.find(opt => opt.value === filters.status)?.label}
            </span>
          )}
          
          {filters.barbeiro && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
              Barbeiro: {barbeiroOptions.find(opt => opt.value === filters.barbeiro)?.label}
            </span>
          )}
          
          {filters.servico && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
              Serviço: {servicoOptions.find(opt => opt.value === filters.servico)?.label}
            </span>
          )}
          
          {filters.dataInicio && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-500/20 text-orange-400">
              A partir de: {filters.dataInicio.toLocaleDateString('pt-BR')}
            </span>
          )}
          
          {filters.dataFim && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
              Até: {filters.dataFim.toLocaleDateString('pt-BR')}
            </span>
          )}
          
          {filters.busca && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
              Busca: "{filters.busca}"
            </span>
          )}
        </div>
      )}
    </div>
  )
}