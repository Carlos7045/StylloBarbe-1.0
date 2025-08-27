'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { DashboardLayout } from '@/shared/components/layout'
import { ScheduleSettings } from '@/domains/barbershops/components/schedule/ScheduleSettings'
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Settings, 
  UserCog, 
  Package, 
  Clock 
} from 'lucide-react'

export default function HorariosPage() {
  return (
    <ProtectedRoute allowedRoles={['admin_barbearia']}>
      <HorariosPageContent />
    </ProtectedRoute>
  )
}

function HorariosPageContent() {
  const { user } = useUser()
  const barbeariaId = user?.barbeariaId || 'barbearia-1'

  const sidebarItems = [
    { id: 'overview', nome: 'Visão Geral', icone: BarChart3, href: '/admin-barbearia' },
    { id: 'agendamentos', nome: 'Agendamentos', icone: Calendar },
    { id: 'barbeiros', nome: 'Barbeiros', icone: Users },
    { id: 'funcionarios', nome: 'Funcionários', icone: UserCog, href: '/admin-barbearia/funcionarios' },
    { id: 'servicos', nome: 'Serviços', icone: Package, href: '/admin-barbearia/servicos' },
    { id: 'horarios', nome: 'Horários', icone: Clock },
    { id: 'performance', nome: 'Performance', icone: Settings }
  ]

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeSidebarItem="horarios"
      title="Configuração de Horários"
      subtitle="Configure horários de funcionamento, intervalos e bloqueios"
    >
      <ScheduleSettings barbeariaId={barbeariaId} />
    </DashboardLayout>
  )
}