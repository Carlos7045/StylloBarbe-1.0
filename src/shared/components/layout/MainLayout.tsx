'use client'

import * as React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Sidebar } from './Sidebar'
import { Container } from './Container'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
  sidebarCollapsed?: boolean
  onSidebarToggle?: () => void
}

interface PublicLayoutProps {
  children: React.ReactNode
  className?: string
  showHeader?: boolean
  showFooter?: boolean
}

/**
 * Layout principal da aplicação
 */
export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${className || ''}`}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

/**
 * Layout para páginas de dashboard com sidebar
 */
export function DashboardLayout({ 
  children, 
  className,
  sidebarCollapsed = false,
  onSidebarToggle
}: DashboardLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className || ''}`}>
      <Header />
      <div className="flex">
        <Sidebar 
          userRole="admin_barbearia"
          collapsed={sidebarCollapsed}
          onToggleCollapse={onSidebarToggle}
        />
        <main className="flex-1 p-6">
          <Container>
            {children}
          </Container>
        </main>
      </div>
    </div>
  )
}

/**
 * Layout para páginas públicas (landing page, login, etc.)
 */
export function PublicLayout({ 
  children, 
  className,
  showHeader = true,
  showFooter = true
}: PublicLayoutProps) {
  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${className || ''}`}>
      {showHeader && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}