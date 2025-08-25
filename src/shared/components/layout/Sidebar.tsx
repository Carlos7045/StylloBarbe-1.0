'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Scissors, 
  Settings, 
  BarChart3, 
  Building2, 
  CreditCard,
  User,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'

interface SidebarProps {
  userRole: 'admin_saas' | 'admin_barbearia' | 'barbeiro' | 'cliente'
  collapsed?: boolean
  onToggleCollapse?: () => void
}

interface NavigationItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavigationItem[]
}

export function Sidebar({ userRole, collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()

  const getNavigationItems = (): NavigationItem[] => {
    switch (userRole) {
      case 'admin_saas':
        return [
          {
            label: 'Dashboard',
            href: '/admin-saas',
            icon: LayoutDashboard,
          },
          {
            label: 'Barbearias',
            href: '/admin-saas/barbearias',
            icon: Building2,
          },
          {
            label: 'Assinaturas',
            href: '/admin-saas/assinaturas',
            icon: CreditCard,
          },
          {
            label: 'Relatórios',
            href: '/admin-saas/relatorios',
            icon: BarChart3,
          },
          {
            label: 'Configurações',
            href: '/admin-saas/configuracoes',
            icon: Settings,
          },
        ]

      case 'admin_barbearia':
        return [
          {
            label: 'Dashboard',
            href: '/admin-barbearia',
            icon: LayoutDashboard,
          },
          {
            label: 'Agenda',
            href: '/admin-barbearia/agenda',
            icon: Calendar,
          },
          {
            label: 'Funcionários',
            href: '/admin-barbearia/funcionarios',
            icon: Users,
          },
          {
            label: 'Serviços',
            href: '/admin-barbearia/servicos',
            icon: Scissors,
          },
          {
            label: 'Relatórios',
            href: '/admin-barbearia/relatorios',
            icon: BarChart3,
          },
          {
            label: 'Configurações',
            href: '/admin-barbearia/configuracoes',
            icon: Settings,
          },
        ]

      case 'barbeiro':
        return [
          {
            label: 'Minha Agenda',
            href: '/barbeiro',
            icon: Calendar,
          },
          {
            label: 'Clientes',
            href: '/barbeiro/clientes',
            icon: Users,
          },
          {
            label: 'Horários',
            href: '/barbeiro/horarios',
            icon: Clock,
          },
          {
            label: 'Perfil',
            href: '/barbeiro/perfil',
            icon: User,
          },
        ]

      case 'cliente':
        return [
          {
            label: 'Meus Agendamentos',
            href: '/cliente',
            icon: Calendar,
          },
          {
            label: 'Novo Agendamento',
            href: '/agendamento',
            icon: Scissors,
          },
          {
            label: 'Perfil',
            href: '/cliente/perfil',
            icon: User,
          },
        ]

      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Toggle button */}
        {onToggleCollapse && (
          <div className="flex justify-end p-2 border-b border-gray-200 dark:border-gray-800">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = isActiveLink(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  isActive
                    ? 'bg-accent-50 text-accent-700 dark:bg-accent-900/20 dark:text-accent-400'
                    : 'text-gray-700 dark:text-gray-300',
                  collapsed && 'justify-center px-2'
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn('h-5 w-5', !collapsed && 'mr-3')} />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="ml-2 rounded-full bg-accent-500 px-2 py-0.5 text-xs font-medium text-primary-900">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>StylloBarber v1.0</p>
              <p>© 2024 Todos os direitos reservados</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}