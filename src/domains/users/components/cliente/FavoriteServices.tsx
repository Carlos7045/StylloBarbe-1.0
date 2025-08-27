'use client'

import { 
  Scissors, 
  Heart, 
  MapPin, 
  Clock,
  Calendar,
  TrendingUp,
  Star
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/shared/components/ui/Card'
import { Badge } from '@/shared/components/ui/Badge'
import { LoadingCard } from '@/shared/components/ui/Loading'
import { ServicoFavorito } from '../../types/cliente-dashboard'
import { cn } from '@/shared/utils/cn'

interface FavoriteServicesProps {
  servicos: ServicoFavorito[]
  carregando?: boolean
  onToggleFavorito: (servicoId: string) => void
  onAgendar: (servicoId: string) => void
  alterandoFavorito?: boolean
}

function ServiceCard({ servico, onToggleFavorito, onAgendar, alterandoFavorito }: {
  servico: ServicoFavorito
  onToggleFavorito: (id: string) => void
  onAgendar: (id: string) => void
  alterandoFavorito?: boolean
}) {
  const getCategoriaVariant = (categoria: string) => {
    switch (categoria) {
      case 'corte':
        return 'info'
      case 'barba':
        return 'success'
      case 'combo':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getCategoriaIcon = (categoria: string) => {
    return <Scissors className="h-3 w-3" />
  }

  const formatarUltimaVez = (data: Date) => {
    const agora = new Date()
    const diferenca = agora.getTime() - data.getTime()
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24))
    
    if (dias === 0) return 'Hoje'
    if (dias === 1) return 'Ontem'
    if (dias < 30) return `${dias} dias atrás`
    if (dias < 365) {
      const meses = Math.floor(dias / 30)
      return `${meses} ${meses === 1 ? 'mês' : 'meses'} atrás`
    }
    return data.toLocaleDateString('pt-BR')
  }

  const getFrequenciaInfo = (total: number) => {
    if (total > 10) return { label: 'Alta', color: 'bg-green-500', percentage: 100 }
    if (total > 5) return { label: 'Média', color: 'bg-amber-500', percentage: 70 }
    return { label: 'Baixa', color: 'bg-red-500', percentage: 40 }
  }

  const frequencia = getFrequenciaInfo(servico.totalRealizados)

  return (
    <Card hover className="relative">
      <CardContent className="p-6">
        {/* Header do Card */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={getCategoriaVariant(servico.categoria)} size="sm">
                {getCategoriaIcon(servico.categoria)}
                <span className="capitalize ml-1">{servico.categoria}</span>
              </Badge>
            </div>
            <h3 className="font-semibold text-theme-primary mb-1">
              {servico.nome}
            </h3>
            <p className="text-sm text-theme-secondary mb-2">
              {servico.descricao}
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorito(servico.id)}
            disabled={alterandoFavorito}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 ml-2"
          >
            <Heart className="h-5 w-5 fill-current" />
          </Button>
        </div>

        {/* Informações da Barbearia */}
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="h-4 w-4 text-theme-tertiary" />
          <span className="text-sm text-theme-secondary">
            {servico.barbeariaNome}
          </span>
        </div>

        {/* Preço e Duração */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-theme-tertiary" />
            <span className="text-sm text-theme-secondary">
              {servico.duracao} min
            </span>
          </div>
          <div className="text-lg font-semibold text-theme-primary">
            R$ {servico.preco.toFixed(2).replace('.', ',')}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-theme-tertiary rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="h-4 w-4 text-theme-tertiary" />
            </div>
            <div className="text-lg font-semibold text-theme-primary">
              {servico.totalRealizados}
            </div>
            <div className="text-xs text-theme-secondary">
              Realizados
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Calendar className="h-4 w-4 text-theme-tertiary" />
            </div>
            <div className="text-sm font-medium text-theme-primary">
              {formatarUltimaVez(servico.ultimaVez)}
            </div>
            <div className="text-xs text-theme-secondary">
              Última vez
            </div>
          </div>
        </div>

        {/* Indicador de Frequência */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-theme-secondary">Frequência</span>
            <span className="font-medium text-theme-primary">
              {frequencia.label}
            </span>
          </div>
          <div className="w-full bg-theme-tertiary rounded-full h-2">
            <div 
              className={cn('h-2 rounded-full transition-all', frequencia.color)}
              style={{ width: `${frequencia.percentage}%` }}
            />
          </div>
        </div>

        {/* Recomendação baseada na frequência */}
        {servico.totalRealizados > 5 && (
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                Seu serviço preferido!
              </span>
            </div>
          </div>
        )}

        {/* Ação */}
        <Button
          variant="primary"
          size="sm"
          onClick={() => onAgendar(servico.id)}
          className="w-full"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Agendar Este Serviço
        </Button>
      </CardContent>
    </Card>
  )
}

export function FavoriteServices({ 
  servicos, 
  carregando,
  onToggleFavorito,
  onAgendar,
  alterandoFavorito
}: FavoriteServicesProps) {
  if (carregando) {
    return (
      <Card>
        <CardHeader>
          <CardTitle icon={<Heart className="h-6 w-6" />}>
            Serviços Favoritos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <LoadingCard key={i} />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={<Heart className="h-6 w-6 text-red-500 fill-current" />}>
          Serviços Favoritos
        </CardTitle>
        <CardDescription>
          {servicos.length} serviço{servicos.length !== 1 ? 's' : ''} favorito{servicos.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {servicos.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-theme-tertiary mx-auto mb-4" />
            <p className="text-theme-secondary mb-2">
              Você ainda não possui serviços favoritos
            </p>
            <p className="text-sm text-theme-tertiary">
              Favorite serviços durante seus agendamentos para vê-los aqui
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicos.map((servico) => (
              <ServiceCard
                key={servico.id}
                servico={servico}
                onToggleFavorito={onToggleFavorito}
                onAgendar={onAgendar}
                alterandoFavorito={alterandoFavorito}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}