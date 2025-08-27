'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface GrowthChartProps {
  data: Array<{
    mes: string
    novasBarbearias: number
    cancelamentos: number
  }>
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="mes" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            labelStyle={{ color: '#374151' }}
          />
          <Legend />
          <Bar 
            dataKey="novasBarbearias" 
            fill="#10b981" 
            name="Novos Cadastros"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="cancelamentos" 
            fill="#ef4444" 
            name="Cancelamentos"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}