'use client'

interface GrowthChartProps {
  data: Array<{
    mes: string
    receita?: number
    barbearias: number
    agendamentos?: number
  }>
}

export function GrowthChart({ data }: GrowthChartProps) {
  const maxBarbearias = Math.max(...data.map(d => d.barbearias))
  
  return (
    <div className="h-80 flex items-end justify-between space-x-2 p-4">
      {data.map((item, index) => {
        const altura = (item.barbearias / maxBarbearias) * 100
        
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="relative w-full flex items-end justify-center mb-2" style={{ height: '240px' }}>
              <div 
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm w-full max-w-12 transition-all duration-500 hover:opacity-80 relative group"
                style={{ height: `${altura}%` }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-theme-secondary border border-theme-primary rounded px-2 py-1 text-xs text-theme-primary whitespace-nowrap">
                  {item.barbearias} barbearias
                </div>
              </div>
            </div>
            <span className="text-xs text-theme-secondary font-medium">
              {item.mes}
            </span>
          </div>
        )
      })}
    </div>
  )
}