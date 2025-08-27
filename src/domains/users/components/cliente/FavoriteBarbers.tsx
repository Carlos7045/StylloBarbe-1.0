'use client'

import { 
  User, 
  Star, 
  Heart, 
  MapPin, 
  Calendar,
  Scissors,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/shared/components/ui/Button'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/shared/components/ui/Card'
import { Badge } from '@/shared/components/ui/Badge'
import { LoadingCard } from '@/shared/components/ui/Loading'
import { BarbeiroFavorito } from '../../types/cliente-dashboard'
import { cn } from '@/shared/utils/cn'

interface FavoriteBarbersProps {
  barbeiros: BarbeiroFavorito[]
  carregando?: boolean
  onToggleFavorito: (barbeiroId: string) => void
  onAgendar: (barbeiroId: string) => void
  alterandoFavorito?: boolean
}

function BarberCard({ barbeiro, onToggleFavorito, onAgendar, alterandoFavorito }: {
  barbeiro: BarbeiroFavorito
  onToggleFavorito: (id: string) => void
  onAgendar: (id: string) => void
  alterandoFavorito?: boolean
}) {
  const renderStars = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-4 w-4',
          i < nota 
            ? 'text-amber-400 fill-current' 
            : 'text-slate-300 dark:text-slate-600'
        )}
      />
    ))
  }

  const formatarUltimoAtendimento = (data: Date) => {
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

  return (
    <Card hover className="relative">
      <CardContent className="p-6">
        {/* Header do Card */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {barbeiro.avatar ? (
              <img
                src={barbeiro.avatar}
                alt={barbeiro.nome}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-theme-tertiary flex items-center justify-center">
                <User className="h-6 w-6 text-theme-muted" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-theme-primary">
                {barbeiro.nome}
              </h3>
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(barbeiro.avaliacaoMedia))}
                <span className="text-sm text-theme-muted ml-1">
                  {barbeiro.avaliacaoMedia.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorito(barbeiro.id)}
            disabled={alterandoFavorito}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Heart className="h-5 w-5 fill-current" />
          </Button>
        </div>

        {/* Informações da Barbearia */}
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="h-4 w-4 text-theme-muted" />
          <span className="text-sm text-theme-secondary">
            {barbeiro.barbeariaNome}
          </span>
        </div>

        {/* Especialidades */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Scissors className="h-4 w-4 text-theme-muted" />
            <span className="text-sm font-medium text-theme-secondary">
              Especialidades:
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {barbeiro.especialidades.map((especialidade, index) => (
              <Badge key={index} variant="info" size="sm">
                {especialidade}
              </Badge>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-theme-tertiary rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-theme-primary">
              {barbeiro.totalAtendimentos}
            </div>
            <div className="text-xs text-theme-muted">
              Atendimentos
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-theme-primary">
              {barbeiro.servicosFavoritos.length}
            </div>
            <div className="text-xs text-theme-muted">
              Serviços
            </div>
          </div>
        </div>

        {/* Último Atendimento */}
        <div className="flex items-center space-x-2 mb-4 text-sm text-theme-secondary">
          <Calendar className="h-4 w-4" />
          <span>Último: {formatarUltimoAtendimento(barbeiro.ultimoAtendimento)}</span>
        </div>

        {/* Serviços Favoritos */}
        {barbeiro.servicosFavoritos.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-theme-secondary mb-2">
              Seus serviços preferidos:
            </div>
            <div className="space-y-1">
              {barbeiro.servicosFavoritos.slice(0, 2).map((servico, index) => (
                <div key={index} className="text-sm text-theme-tertiary">
                  • {servico}
                </div>
              ))}
              {barbeiro.servicosFavoritos.length > 2 && (
                <div className="text-sm text-theme-muted">
                  +{barbeiro.servicosFavoritos.length - 2} outros
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ações */}
        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAgendar(barbeiro.id)}
            className="flex-1"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Agendar
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Contato
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function FavoriteBarbers({ 
  barbeiros, 
  carregando,
  onToggleFavorito,
  onAgendar,
  alterandoFavorito
}: FavoriteBarbersProps) {
  if (carregando) {
    return (
      <Card>
        <CardHeader>
          <CardTitle icon={<Heart className="h-6 w-6" />}>
            Barbeiros Favoritos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
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
          Barbeiros Favoritos
        </CardTitle>
        <CardDescription>
          {barbeiros.length} barbeiro{barbeiros.length !== 1 ? 's' : ''} favorito{barbeiros.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {barbeiros.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-theme-muted mx-auto mb-4" />
            <p className="text-theme-tertiary mb-2">
              Você ainda não possui barbeiros favoritos
            </p>
            <p className="text-sm text-theme-muted">
              Favorite barbeiros durante seus agendamentos para vê-los aqui
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {barbeiros.map((barbeiro) => (
              <BarberCard
                key={barbeiro.id}
                barbeiro={barbeiro}
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