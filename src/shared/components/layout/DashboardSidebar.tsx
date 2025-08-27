'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/ui/Button'
import { useUser } from '@/domains/auth'
import { 
  User, 
  LogOut,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface SidebarItem {
  id: string
  nome: string
  icone: React.ComponentType<{ className?: string }>
  href?: string
}

interface DashboardSidebarProps {
  items: SidebarItem[]
  activeItem?: string
  onItemClick?: (itemId: string) => void
  className?: string
}

export function DashboardSidebar({ 
  items, 
  activeItem, 
  onItemClick,
  className 
}: DashboardSidebarProps) {
  const { user, logout } = useUser()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      setIsLoggingOut(false)
    }
  }

  const handleItemClick = (item: SidebarItem) => {
    if (item.href) {
      router.push(item.href)
    } else if (onItemClick) {
      onItemClick(item.id)
    }
  }

  const getRoleDisplayName = (role?: string) => {
    switch (role) {
      case 'cliente':
        return 'Cliente'
      case 'barbeiro':
        return 'Barbeiro'
      case 'admin_barbearia':
        return 'Admin Barbearia'
      case 'admin_saas':
        return 'Admin SaaS'
      default:
        return 'Usuário'
    }
  }

  return (
    <div className={cn("w-64 bg-theme-secondary border-r border-theme-primary flex flex-col", className)}>
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center">
            <span className="text-slate-900 font-bold text-sm">S</span>
          </div>
          <span className="text-theme-primary font-bold">STYLLOBARBER</span>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          {items.map((item) => {
            const Icone = item.icone
            const isActive = activeItem === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                  isActive
                    ? 'btn-primary'
                    : 'text-theme-secondary hover:bg-theme-hover hover:text-theme-primary'
                )}
              >
                <Icone className="h-5 w-5" />
                <span className="font-medium">{item.nome}</span>
              </button>
            )
          })}
        </nav>
      </div>
      
      {/* User Info at Bottom */}
      <div className="mt-auto p-6 border-t border-theme-primary">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-theme-tertiary rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-theme-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-theme-primary text-sm font-medium truncate">
              {user?.nome || 'Usuário'}
            </p>
            <p className="text-theme-tertiary text-xs">
              {getRoleDisplayName(user?.role)}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
            title="Sair do sistema"
          >
            {isLoggingOut ? (
              <AlertCircle className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}