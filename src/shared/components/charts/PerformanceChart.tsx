'use client'

import { TrendingUp, DollarSign } from 'lucide-react'

interface PerformanceChartProps {
  data: Array<{
    dia: string
    agendamentos: number
    receita: number
  }>
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <TrendingUp className="h-8 w-8 mx-auto mb-2" />
          <p>Nenhum dado disponível</p>
        </div>
      </div>
    )
  }

  const maxReceita = Math.max(...data.map(d => d.receita))
  const maxAgendamentos = Math.max(...data.map(d => d.agendamentos))
  
  return (
    <div className="space-y-4">
      {/* Legenda */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-300">Receita</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-300">Agendamentos</span>
          </div>
        </div>
        <div className="text-gray-400">
          Últimos 7 dias
        </div>
      </div>

      {/* Gráfico */}
      <div className="relative h-40">
        <div className="absolute inset-0 flex items-end justify-between space-x-1">
          {data.map((item, index) => {
            const alturaReceita = maxReceita > 0 ? (item.receita / maxReceita) * 100 : 0
            const alturaAgendamentos = maxAgendamentos > 0 ? (item.agendamentos / maxAgendamentos) * 100 : 0
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 group">
                {/* Barras */}
                <div className="relative w-full flex items-end justify-center space-x-1 mb-2 h-32">
                  {/* Barra de Receita */}
                  <div className="relative flex-1 max-w-4">
                    <div 
                      className="bg-yellow-500 rounded-t transition-all duration-300 group-hover:bg-yellow-400 w-full"
                      style={{ height: `${alturaReceita}%` }}
                    />
                    {/* Tooltip para receita */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white whitespace-nowrap z-10">
                      R$ {item.receita.toFixed(2)}
                    </div>
                  </div>
                  
                  {/* Barra de Agendamentos */}
                  <div className="relative flex-1 max-w-4">
                    <div 
                      className="bg-blue-500 rounded-t transition-all duration-300 group-hover:bg-blue-400 w-full"
                      style={{ height: `${alturaAgendamentos}%` }}
                    />
                    {/* Tooltip para agendamentos */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white whitespace-nowrap z-10">
                      {item.agendamentos} agend.
                    </div>
                  </div>
                </div>
                
                {/* Label do dia */}
                <span className="text-xs text-gray-400 font-medium">
                  {item.dia}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-300">Receita Total</p>
            <p className="text-lg font-semibold text-white">
              R$ {data.reduce((acc, d) => acc + d.receita, 0).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-blue-500" />
          <div>
            <p className="text-sm text-gray-300">Total Agendamentos</p>
            <p className="text-lg font-semibold text-white">
              {data.reduce((acc, d) => acc + d.agendamentos, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}