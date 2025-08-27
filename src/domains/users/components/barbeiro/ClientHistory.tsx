'use client'

import { useState } from 'react'
import { User, Phone, Calendar, Star, DollarSign, Scissors, Search } from 'lucide-react'
import { HistoricoCliente } from '../../types/barbeiro-dashboard'

interface ClientHistoryProps {
  clientes: HistoricoCliente[]
}

export function ClientHistory({ clientes }: ClientHistoryProps) {
  const [filtro, setFiltro] = useState('')
  const [ordenacao, setOrdenacao] = useState<'nome' | 'ultimo_atendimento' | 'total_gasto'>('ultimo_atendimento')

  const clientesFiltrados = clientes
    .filter(cliente => 
      cliente.clienteNome.toLowerCase().includes(filtro.toLowerCase()) ||
      cliente.clienteTelefone.includes(filtro)
    )
    .sort((a, b) => {
      switch (ordenacao) {
        case 'nome':
          return a.clienteNome.localeCompare(b.clienteNome)
        case 'ultimo_atendimento':
          return new Date(b.ultimoAtendimento).getTime() - new Date(a.ultimoAtendimento).getTime()
        case 'total_gasto':
          return b.valorTotalGasto - a.valorTotalGasto
        default:
          return 0
      }
    })

  const getClienteCategoria = (cliente: HistoricoCliente) => {
    if (cliente.totalAtendimentos >= 10) return { label: 'VIP', cor: 'bg-purple-500/20 text-purple-400' }
    if (cliente.totalAtendimentos >= 5) return { label: 'Fiel', cor: 'bg-blue-500/20 text-blue-400' }
    if (cliente.totalAtendimentos >= 2) return { label: 'Regular', cor: 'bg-green-500/20 text-green-400' }
    return { label: 'Novo', cor: 'bg-gray-600/20 text-gray-400' }
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-white">
            Histórico de Clientes
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por nome ou telefone..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent w-full sm:w-64"
              />
            </div>
            
            <select
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value as any)}
              className="px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            >
              <option value="ultimo_atendimento">Último Atendimento</option>
              <option value="nome">Nome</option>
              <option value="total_gasto">Total Gasto</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-700">
        {clientesFiltrados.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <User className="h-12 w-12 mx-auto mb-3 text-gray-500" />
            <p>Nenhum cliente encontrado</p>
          </div>
        ) : (
          clientesFiltrados.map((cliente) => {
            const categoria = getClienteCategoria(cliente)
            
            return (
              <div key={cliente.clienteId} className="p-6 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {cliente.clienteAvatar ? (
                      <img
                        src={cliente.clienteAvatar}
                        alt={cliente.clienteNome}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-white truncate">
                        {cliente.clienteNome}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoria.cor}`}>
                        {categoria.label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{cliente.clienteTelefone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {cliente.ultimoAtendimento.toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Scissors className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {cliente.totalAtendimentos} atendimentos
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-green-400">
                          R$ {cliente.valorTotalGasto.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span className="text-sm font-medium text-white">
                            {cliente.avaliacaoMedia.toFixed(1)}
                          </span>
                        </div>
                        
                        {cliente.servicosFavoritos.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-400">Favoritos:</span>
                            <div className="flex space-x-1">
                              {cliente.servicosFavoritos.slice(0, 2).map((servico, index) => (
                                <span
                                  key={index}
                                  className="inline-block px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded"
                                >
                                  {servico}
                                </span>
                              ))}
                              {cliente.servicosFavoritos.length > 2 && (
                                <span className="text-xs text-gray-500">
                                  +{cliente.servicosFavoritos.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {cliente.observacoes && (
                      <div className="mt-2 p-2 bg-amber-400/20 border border-amber-400/30 rounded">
                        <p className="text-sm text-amber-300">
                          <strong>Observações:</strong> {cliente.observacoes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}