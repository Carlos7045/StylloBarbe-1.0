'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface PerformanceChartProps {
  data: Array<{
    periodo: string
    agendamentos: number
    receita: number
    clientesNovos: number
    avaliacaoMedia: number
  }>
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="periodo" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `R$ ${value}`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'receita') return [`R$ ${value}`, 'Receita']
              if (name === 'avaliacaoMedia') return [`${value.toFixed(1)} ⭐`, 'Avaliação']
              return [value, name === 'agendamentos' ? 'Agendamentos' : 'Clientes Novos']
            }}
            labelStyle={{ color: '#374151' }}
          />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="agendamentos" 
            fill="#3b82f6" 
            name="Agendamentos"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            yAxisId="right"
            dataKey="receita" 
            fill="#10b981" 
            name="Receita"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            yAxisId="left"
            dataKey="clientesNovos" 
            fill="#8b5cf6" 
            name="Clientes Novos"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}