'use client'

import { ReactNode } from 'react'
import { DashboardSidebar } from './DashboardSidebar'
import { ThemeDropdown } from '@/shared/components/ui/ThemeDropdown'
import { Button } from '@/shared/components/ui/Button'
import { Plus } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface SidebarItem {
  id: string
  nome: string
  icone: React.ComponentType<{ className?: string }>
  href?: string
}

interface DashboardLayoutProps {
  children: ReactNode
  sidebarItems: SidebarItem[]
  activeSidebarItem?: string
  onSidebarItemClick?: (itemId: string) => void
  title: string
  subtitle?: string
  headerActions?: ReactNode
  showNewButton?: boolean
  newButtonText?: string
  onNewButtonClick?: () => void
  className?: string
}

export function DashboardLayout({
  children,
  sidebarItems,
  activeSidebarItem,
  onSidebarItemClick,
  title,
  subtitle,
  headerActions,
  showNewButton = false,
  newButtonText = "Novo",
  onNewButtonClick,
  className
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex min-h-screen bg-theme-primary", className)}>
      {/* Sidebar */}
      <DashboardSidebar
        items={sidebarItems}
        activeItem={activeSidebarItem}
        onItemClick={onSidebarItemClick}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-theme-secondary border-b border-theme-primary px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-theme-primary mb-2">
                {title}
              </h1>
              {subtitle && (
                <p className="text-theme-secondary">
                  {subtitle}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <ThemeDropdown size="sm" variant="outline" />
              
              {/* Custom header actions */}
              {headerActions}
              
              {/* New button */}
              {showNewButton && onNewButtonClick && (
                <Button 
                  variant="primary"
                  onClick={onNewButtonClick}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {newButtonText}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 bg-theme-primary">
          {children}
        </div>
      </div>
    </div>
  )
}