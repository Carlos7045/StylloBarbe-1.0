'use client'

import * as React from 'react'
import { Download, X, Smartphone, Monitor } from 'lucide-react'
import { Button } from './Button'
import { Card, CardContent } from './Card'
import { usePWA } from '../../hooks/usePWA'
import { cn } from '../../utils/cn'

interface PWAInstallPromptProps {
  className?: string
  variant?: 'banner' | 'card' | 'modal'
  onDismiss?: () => void
  showOnlyOnce?: boolean
}

export function PWAInstallPrompt({ 
  className, 
  variant = 'banner',
  onDismiss,
  showOnlyOnce = true 
}: PWAInstallPromptProps) {
  const { isInstallable, isInstalled, installPWA } = usePWA()
  const [isDismissed, setIsDismissed] = React.useState(false)

  // Verifica se já foi dispensado anteriormente
  React.useEffect(() => {
    if (showOnlyOnce) {
      const dismissed = localStorage.getItem('pwa-install-dismissed')
      if (dismissed) {
        setIsDismissed(true)
      }
    }
  }, [showOnlyOnce])

  const handleInstall = async () => {
    const success = await installPWA()
    if (success) {
      handleDismiss()
    }
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    if (showOnlyOnce) {
      localStorage.setItem('pwa-install-dismissed', 'true')
    }
    onDismiss?.()
  }

  // Não mostra se não é instalável, já está instalado ou foi dispensado
  if (!isInstallable || isInstalled || isDismissed) {
    return null
  }

  if (variant === 'banner') {
    return (
      <div className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-primary-800 text-white p-4 shadow-lg',
        'transform transition-transform duration-300 ease-in-out',
        className
      )}>
        <div className="container-custom">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent-500 flex items-center justify-center flex-shrink-0">
                <Smartphone className="h-5 w-5 text-primary-900" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm">Instalar StylloBarber</p>
                <p className="text-xs text-gray-300 truncate">
                  Acesse rapidamente e use offline
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="accent"
                size="sm"
                onClick={handleInstall}
                className="text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Instalar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="h-8 w-8 text-gray-300 hover:text-white hover:bg-primary-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <Card className={cn('border-accent-200 bg-accent-50 dark:bg-accent-900/20', className)}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-accent-500 flex items-center justify-center flex-shrink-0">
              <Monitor className="h-6 w-6 text-primary-900" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary-800 dark:text-white mb-1">
                Instalar StylloBarber
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Instale nosso app para ter acesso rápido, notificações e 
                funcionalidade offline. Funciona como um app nativo!
              </p>
              
              <div className="flex items-center gap-2">
                <Button onClick={handleInstall} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Instalar App
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDismiss}>
                  Agora não
                </Button>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="h-8 w-8 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Modal variant
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="h-16 w-16 rounded-2xl bg-accent-500 flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-primary-900" />
            </div>
            
            <h3 className="text-xl font-semibold text-primary-800 dark:text-white mb-2">
              Instalar StylloBarber
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Instale nosso app para ter a melhor experiência com acesso 
              rápido, notificações e funcionalidade offline.
            </p>
            
            <div className="flex gap-3">
              <Button onClick={handleInstall} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Instalar
              </Button>
              <Button variant="outline" onClick={handleDismiss} className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente para mostrar status offline
export function OfflineIndicator() {
  const { isOnline } = usePWA()

  if (isOnline) {
    return null
  }

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-warning-500 text-white px-4 py-2 text-center text-sm">
      <span className="font-medium">Modo Offline</span>
      <span className="ml-2">Algumas funcionalidades podem estar limitadas</span>
    </div>
  )
}