'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RevenueChartProps {
  data: Array<{
    mes: string
    receita: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="mes" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
          />
          <Tooltip 
            formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Receita']}
            labelStyle={{ color: '#374151' }}
          />
          <Line 
            type="monotone" 
            dataKey="receita" 
            stroke="#d4af37" 
            strokeWidth={3}
            dot={{ fill: '#d4af37', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#d4af37', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}