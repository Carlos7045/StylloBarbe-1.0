'use client'

import { useState } from 'react'
import { useUser } from '@/domains/auth'
import { ProtectedRoute } from '@/domains/auth'
import { DashboardLayout } from '@/shared/components/layout'
import { StaffManagement } from '@/domains/barbershops/components/staff/StaffManagement'
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Settings, 
  UserCog, 
  Package, 
  Clock 
} from 'lucide-react'

export default function FuncionariosPage() {
  return (
    <ProtectedRoute allowedRoles={['admin_barbearia']}>
      <FuncionariosPageContent />
    </ProtectedRoute>
  )
}

function FuncionariosPageContent() {
  const { user } = useUser()
  const barbeariaId = user?.barbeariaId || 'barbearia-1'

  const sidebarItems = [
    { id: 'overview', nome: 'Visão Geral', icone: BarChart3, href: '/admin-barbearia' },
    { id: 'agendamentos', nome: 'Agendamentos', icone: Calendar },
    { id: 'barbeiros', nome: 'Barbeiros', icone: Users },
    { id: 'funcionarios', nome: 'Funcionários', icone: UserCog },
    { id: 'servicos', nome: 'Serviços', icone: Package, href: '/admin-barbearia/servicos' },
    { id: 'horarios', nome: 'Horários', icone: Clock, href: '/admin-barbearia/horarios' },
    { id: 'performance', nome: 'Performance', icone: Settings }
  ]

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeSidebarItem="funcionarios"
      title="Gestão de Funcionários"
      subtitle="Gerencie barbeiros, recepcionistas e suas configurações"
    >
      <StaffManagement barbeariaId={barbeariaId} />
    </DashboardLayout>
  )
}