'use client'

import { useState } from 'react'
import { Search, MoreVertical, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { BarbeariaStatus } from '../../types/admin-saas'

interface BarbershopsListProps {
  barbearias: BarbeariaStatus[]
  onToggleStatus: (id: string, ativa: boolean) => void
  onViewDetails: (id: string) => void
}

export function BarbershopsList({ barbearias, onToggleStatus, onViewDetails }: BarbershopsListProps) {
  const [filtro, setFiltro] = useState('')
  const [statusFiltro, setStatusFiltro] = useState<string>('todos')

  const barbeariasFiltradas = barbearias.filter(barbearia => {
    const matchNome = barbearia.nome.toLowerCase().includes(filtro.toLowerCase())
    const matchEmail = barbearia.email.toLowerCase().includes(filtro.toLowerCase())
    const matchStatus = statusFiltro === 'todos' || barbearia.statusPagamento === statusFiltro
    
    return (matchNome || matchEmail) && matchStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'em_dia':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'pendente':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'vencido':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'cancelado':
        return <XCircle className="h-5 w-5 text-gray-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      em_dia: 'Em dia',
      pendente: 'Pendente',
      vencido: 'Vencido',
      cancelado: 'Cancelado'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const getStatusBadgeClass = (status: string) => {
    const classes = {
      em_dia: 'bg-green-100 text-green-800',
      pendente: 'bg-yellow-100 text-yellow-800',
      vencido: 'bg-red-100 text-red-800',
      cancelado: 'bg-gray-100 text-gray-800'
    }
    return classes[status as keyof typeof classes] || classes.pendente
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Barbearias Cadastradas
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <select
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="todos">Todos os status</option>
              <option value="em_dia">Em dia</option>
              <option value="pendente">Pendente</option>
              <option value="vencido">Vencido</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Barbearia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plano
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Pagamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Próximo Vencimento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor Mensal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {barbeariasFiltradas.map((barbearia) => (
              <tr key={barbearia.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {barbearia.nome}
                    </div>
                    <div className="text-sm text-gray-500">
                      {barbearia.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {barbearia.plano}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(barbearia.statusPagamento)}
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(barbearia.statusPagamento)}`}>
                      {getStatusText(barbearia.statusPagamento)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {barbearia.proximoVencimento.toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {barbearia.valorMensal.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    barbearia.ativa 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {barbearia.ativa ? 'Ativa' : 'Inativa'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(barbearia.id)}
                    >
                      Detalhes
                    </Button>
                    <Button
                      variant={barbearia.ativa ? "destructive" : "primary"}
                      size="sm"
                      onClick={() => onToggleStatus(barbearia.id, !barbearia.ativa)}
                    >
                      {barbearia.ativa ? 'Desativar' : 'Ativar'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {barbeariasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma barbearia encontrada com os filtros aplicados.</p>
        </div>
      )}
    </div>
  )
}