'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { DashboardLayout } from '@/shared/components/layout'
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
  History
} from 'lucide-react'

export default function ClientePage() {
  return (
    <ProtectedRoute allowedRoles={['cliente']}>
      <ClienteDashboard />
    </ProtectedRoute>
  )
}

function ClienteDashboard() {
  const { user } = useUser()
  const router = useRouter()
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

  const sidebarItems = [
    { id: 'dashboard', nome: 'Dashboard', icone: Calendar },
    { id: 'agendamentos', nome: 'Agendamentos', icone: Calendar },
    { id: 'historico', nome: 'Histórico', icone: History },
    { id: 'favoritos', nome: 'Favoritos', icone: Heart },
    { id: 'perfil', nome: 'Perfil', icone: User }
  ]

  const handleAgendar = (id?: string) => {
    // Navegar para a página de agendamento
    router.push('/agendamento')
  }

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeSidebarItem={abaSelecionada}
      onSidebarItemClick={(itemId) => setAbaSelecionada(itemId as any)}
      title="Dashboard do Cliente"
      subtitle={`Bem-vindo, ${user?.nome}! Visão geral das suas atividades de hoje.`}
      showNewButton={true}
      newButtonText="Novo Agendamento"
      onNewButtonClick={() => handleAgendar()}
    >
      {abaSelecionada === 'dashboard' && (
        <div className="space-y-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        </div>
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
        <div className="space-y-6">
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
    </DashboardLayout>
  )
}