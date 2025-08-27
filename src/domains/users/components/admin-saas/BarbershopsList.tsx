'use client'

import { useState } from 'react'
import { Building2, Users, Calendar, DollarSign, MapPin, Phone, Mail, MoreVertical } from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'

interface Barbearia {
  id: string
  nome: string
  proprietario: string
  email: string
  telefone: string
  endereco: string
  cidade: string
  estado: string
  status: 'ativa' | 'inativa' | 'pendente' | 'suspensa'
  plano: 'basico' | 'intermediario' | 'avancado' | 'multi-unidade'
  barbeiros: number
  agendamentosMes: number
  receitaMes: number
  dataCadastro: Date
  ultimoAcesso: Date
}

interface BarbershopsListProps {
  barbearias: Barbearia[]
  onToggleStatus: (id: string, status: Barbearia['status']) => void
  onViewDetails: (id: string) => void
}

export function BarbershopsList({ barbearias, onToggleStatus, onViewDetails }: BarbershopsListProps) {
  const [filtroStatus, setFiltroStatus] = useState<string>('todos')
  const [filtroPlano, setFiltroPlano] = useState<string>('todos')

  const barbeariasFiltradasList = barbearias.filter(barbearia => {
    if (filtroStatus !== 'todos' && barbearia.status !== filtroStatus) return false
    if (filtroPlano !== 'todos' && barbearia.plano !== filtroPlano) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'inativa':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'pendente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'suspensa':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      ativa: 'Ativa',
      inativa: 'Inativa',
      pendente: 'Pendente',
      suspensa: 'Suspensa'
    }
    return statusMap[status as keyof typeof statusMap] || status
  }

  const getPlanoText = (plano: string) => {
    const planoMap = {
      basico: 'Básico',
      intermediario: 'Intermediário',
      avancado: 'Avançado',
      'multi-unidade': 'Multi-unidade'
    }
    return planoMap[plano as keyof typeof planoMap] || plano
  }

  const getPlanoColor = (plano: string) => {
    switch (plano) {
      case 'basico':
        return 'text-blue-400'
      case 'intermediario':
        return 'text-green-400'
      case 'avancado':
        return 'text-purple-400'
      case 'multi-unidade':
        return 'text-orange-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="bg-theme-secondary rounded-lg border border-theme-primary">
      <div className="p-6 border-b border-theme-primary">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-theme-primary">
            Barbearias Cadastradas
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-3 py-2 border border-theme-primary bg-theme-tertiary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="todos">Todos os status</option>
              <option value="ativa">Ativa</option>
              <option value="inativa">Inativa</option>
              <option value="pendente">Pendente</option>
              <option value="suspensa">Suspensa</option>
            </select>
            
            <select
              value={filtroPlano}
              onChange={(e) => setFiltroPlano(e.target.value)}
              className="px-3 py-2 border border-theme-primary bg-theme-tertiary text-theme-primary rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="todos">Todos os planos</option>
              <option value="basico">Básico</option>
              <option value="intermediario">Intermediário</option>
              <option value="avancado">Avançado</option>
              <option value="multi-unidade">Multi-unidade</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-theme-primary">
        {barbeariasFiltradasList.length === 0 ? (
          <div className="p-8 text-center text-theme-tertiary">
            <Building2 className="h-12 w-12 mx-auto mb-3 text-theme-muted" />
            <p>Nenhuma barbearia encontrada</p>
          </div>
        ) : (
          barbeariasFiltradasList.map((barbearia) => (
            <div key={barbearia.id} className="p-6 hover:bg-theme-hover transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-theme-tertiary" />
                      <h3 className="text-lg font-semibold text-theme-primary">
                        {barbearia.nome}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(barbearia.status)}`}>
                      {getStatusText(barbearia.status)}
                    </span>
                    <span className={`text-sm font-medium ${getPlanoColor(barbearia.plano)}`}>
                      {getPlanoText(barbearia.plano)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-secondary">
                          {barbearia.proprietario}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-secondary">
                          {barbearia.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-secondary">
                          {barbearia.telefone}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-secondary">
                          {barbearia.cidade}, {barbearia.estado}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-secondary">
                          {barbearia.barbeiros} barbeiros
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm text-theme-secondary">
                          {barbearia.agendamentosMes} agendamentos/mês
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-theme-tertiary" />
                        <span className="text-sm font-medium text-green-400">
                          R$ {barbearia.receitaMes.toLocaleString()}/mês
                        </span>
                      </div>
                      <div className="text-sm text-theme-muted">
                        Cadastro: {barbearia.dataCadastro.toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-sm text-theme-muted">
                        Último acesso: {barbearia.ultimoAcesso.toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(barbearia.id)}
                  >
                    Detalhes
                  </Button>
                  
                  {barbearia.status === 'ativa' ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onToggleStatus(barbearia.id, 'suspensa')}
                    >
                      Suspender
                    </Button>
                  ) : barbearia.status === 'suspensa' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onToggleStatus(barbearia.id, 'ativa')}
                    >
                      Reativar
                    </Button>
                  ) : barbearia.status === 'pendente' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onToggleStatus(barbearia.id, 'ativa')}
                    >
                      Aprovar
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}