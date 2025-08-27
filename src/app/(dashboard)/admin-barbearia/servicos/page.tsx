'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { DashboardLayout } from '@/shared/components/layout'
import { ServiceManagement } from '@/domains/services/components/ServiceManagement'
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Settings, 
  UserCog, 
  Package, 
  Clock 
} from 'lucide-react'

export default function ServicosPage() {
  return (
    <ProtectedRoute allowedRoles={['admin_barbearia']}>
      <ServicosPageContent />
    </ProtectedRoute>
  )
}

function ServicosPageContent() {
  const { user } = useUser()
  const barbeariaId = user?.barbeariaId || 'barbearia-1'

  const sidebarItems = [
    { id: 'overview', nome: 'Visão Geral', icone: BarChart3, href: '/admin-barbearia' },
    { id: 'agendamentos', nome: 'Agendamentos', icone: Calendar },
    { id: 'barbeiros', nome: 'Barbeiros', icone: Users },
    { id: 'funcionarios', nome: 'Funcionários', icone: UserCog, href: '/admin-barbearia/funcionarios' },
    { id: 'servicos', nome: 'Serviços', icone: Package },
    { id: 'horarios', nome: 'Horários', icone: Clock, href: '/admin-barbearia/horarios' },
    { id: 'performance', nome: 'Performance', icone: Settings }
  ]

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeSidebarItem="servicos"
      title="Gestão de Serviços"
      subtitle="Gerencie os serviços oferecidos pela sua barbearia"
    >
      <ServiceManagement barbeariaId={barbeariaId} />
    </DashboardLayout>
  )
}