'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { Button } from '@/shared/components/ui/Button'
import { useCliente } from '@/domains/users/hooks/useCliente'
import { ClientMetrics } from '@/domains/users/components/cliente/ClientMetrics'
import { UpcomingAppointments } from '@/domains/users/components/cliente/UpcomingAppointments'
import { AppointmentHistory } from '@/domains/users/components/cliente/AppointmentHistory'
import { ClientProfile } from '@/domains/users/components/cliente/ClientProfile'
import { FavoriteBarbers } from '@/domains/users/components/cliente/FavoriteBarbers'
import { FavoriteServices } from '@/domains/users/components/cliente/FavoriteServices'
import { 
  Calendar, 
  User, 
  Heart, 
  History,
  Settings,
  Plus
} from 'lucide-react'
import { ThemeDropdown } from '@/shared/components/ui/ThemeDropdown'

export default function ClientePage() {
  return (
    <ProtectedRoute allowedRoles={['cliente']}>
      <ClienteDashboard />
    </ProtectedRoute>
  )
}

function ClienteDashboard() {
  const { user, logout } = useUser()
  const [abaSelecionada, setAbaSelecionada] = useState<'dashboard' | 'agendamentos' | 'historico' | 'favoritos' | 'perfil'>('dashboard')
  
  // Usar o ID do usuário logado - em produção viria do contexto de auth
  const clienteId = user?.id || 'cliente1'
  
  // Temporariamente comentar o hook para testar
  const {
    perfil,
    agendamentosFuturos,
    historicoAgendamentos,
    barbeirosFavoritos,
    servicosFavoritos,
    metricas,
    carregandoPerfil,
    carregandoAgendamentos,
    carregandoBarbeirosFavoritos,
    carregandoServicosFavoritos,
    carregandoMetricas,
    atualizandoPerfil,
    reagendando,
    cancelando,
    alterandoBarbeiroFavorito,
    alterandoServicoFavorito,
    atualizarPerfil,
    reagendarAgendamento,
    cancelarAgendamento,
    toggleBarbeiroFavorito,
    toggleServicoFavorito
  } = useCliente(clienteId)

  const abas = [
    { id: 'dashboard', nome: 'Dashboard', icone: Calendar },
    { id: 'agendamentos', nome: 'Agendamentos', icone: Calendar },
    { id: 'historico', nome: 'Histórico', icone: History },
    { id: 'favoritos', nome: 'Favoritos', icone: Heart },
    { id: 'perfil', nome: 'Perfil', icone: User }
  ]

  const handleAgendar = (id?: string) => {
    // Implementar navegação para página de agendamento
    console.log('Navegar para agendamento', id)
  }

  return (
    <div className="flex min-h-screen bg-theme-primary">
      {/* Sidebar */}
      <div className="w-64 bg-theme-secondary border-r border-theme-primary">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">S</span>
            </div>
            <span className="text-theme-primary font-bold">STYLLOBARBER</span>
          </div>
          
          <nav className="space-y-2">
            {abas.map((aba) => {
              const Icone = aba.icone
              return (
                <button
                  key={aba.id}
                  onClick={() => setAbaSelecionada(aba.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    abaSelecionada === aba.id
                      ? 'btn-primary'
                      : 'text-theme-secondary hover:bg-theme-hover hover:text-theme-primary'
                  }`}
                >
                  <Icone className="h-5 w-5" />
                  <span className="font-medium">{aba.nome}</span>
                </button>
              )
            })}
          </nav>
        </div>
        
        {/* User Info at Bottom */}
        <div className="absolute bottom-0 w-64 p-6 border-t border-theme-primary">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-theme-tertiary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-theme-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-theme-primary text-sm font-medium">{user?.nome || 'Cliente'}</p>
              <p className="text-theme-tertiary text-xs">Cliente</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={logout}
              className="text-theme-tertiary hover:text-theme-primary"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-theme-secondary border-b border-theme-primary px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-theme-primary mb-2">
                Dashboard do Cliente
              </h1>
              <p className="text-theme-secondary">
                Bem-vindo, {user?.nome}! Visão geral das suas atividades de hoje.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeDropdown size="sm" variant="outline" />
              <Button 
                variant="primary"
                onClick={() => handleAgendar()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        <div className="p-8 space-y-8 bg-theme-primary">
          {abaSelecionada === 'dashboard' && (
            <>
              {/* Métricas */}
              {metricas && (
                <ClientMetrics 
                  metricas={metricas} 
                  carregando={carregandoMetricas} 
                />
              )}

              {/* Próximos Agendamentos */}
              <UpcomingAppointments
                agendamentos={agendamentosFuturos}
                carregando={carregandoAgendamentos}
                onReagendar={reagendarAgendamento}
                onCancelar={cancelarAgendamento}
                reagendando={reagendando}
                cancelando={cancelando}
              />

              {/* Favoritos Resumo */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FavoriteBarbers
                  barbeiros={barbeirosFavoritos.slice(0, 2)}
                  carregando={carregandoBarbeirosFavoritos}
                  onToggleFavorito={toggleBarbeiroFavorito}
                  onAgendar={handleAgendar}
                  alterandoFavorito={alterandoBarbeiroFavorito}
                />
                <FavoriteServices
                  servicos={servicosFavoritos.slice(0, 3)}
                  carregando={carregandoServicosFavoritos}
                  onToggleFavorito={toggleServicoFavorito}
                  onAgendar={handleAgendar}
                  alterandoFavorito={alterandoServicoFavorito}
                />
              </div>
            </>
          )}

          {abaSelecionada === 'agendamentos' && (
            <UpcomingAppointments
              agendamentos={agendamentosFuturos}
              carregando={carregandoAgendamentos}
              onReagendar={reagendarAgendamento}
              onCancelar={cancelarAgendamento}
              reagendando={reagendando}
              cancelando={cancelando}
            />
          )}

          {abaSelecionada === 'historico' && (
            <AppointmentHistory
              agendamentos={historicoAgendamentos}
              carregando={carregandoAgendamentos}
            />
          )}

          {abaSelecionada === 'favoritos' && (
            <div className="space-y-8">
              <FavoriteBarbers
                barbeiros={barbeirosFavoritos}
                carregando={carregandoBarbeirosFavoritos}
                onToggleFavorito={toggleBarbeiroFavorito}
                onAgendar={handleAgendar}
                alterandoFavorito={alterandoBarbeiroFavorito}
              />
              <FavoriteServices
                servicos={servicosFavoritos}
                carregando={carregandoServicosFavoritos}
                onToggleFavorito={toggleServicoFavorito}
                onAgendar={handleAgendar}
                alterandoFavorito={alterandoServicoFavorito}
              />
            </div>
          )}

          {abaSelecionada === 'perfil' && perfil && (
            <ClientProfile
              perfil={perfil}
              onUpdateProfile={atualizarPerfil}
            />
          )}
        </div>
      </div>
    </div>
  )
}