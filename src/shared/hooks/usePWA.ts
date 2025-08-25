'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

interface PWAState {
  isInstallable: boolean
  isInstalled: boolean
  isStandalone: boolean
  isOnline: boolean
  installPrompt: BeforeInstallPromptEvent | null
}

/**
 * Hook para gerenciar funcionalidades PWA
 */
export function usePWA() {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isStandalone: false,
    isOnline: true,
    installPrompt: null,
  })

  useEffect(() => {
    // Detecta se está rodando como PWA instalado
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone) ||
      document.referrer.includes('android-app://')

    // Detecta se já está instalado
    const isInstalled = isStandalone

    // Detecta status online/offline
    const isOnline = navigator.onLine

    setPwaState(prev => ({
      ...prev,
      isStandalone,
      isInstalled,
      isOnline,
    }))

    // Event listener para prompt de instalação
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setPwaState(prev => ({
        ...prev,
        isInstallable: true,
        installPrompt: e,
      }))
    }

    // Event listener para quando o app é instalado
    const handleAppInstalled = () => {
      setPwaState(prev => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        installPrompt: null,
      }))
    }

    // Event listeners para status online/offline
    const handleOnline = () => {
      setPwaState(prev => ({ ...prev, isOnline: true }))
    }

    const handleOffline = () => {
      setPwaState(prev => ({ ...prev, isOnline: false }))
    }

    // Adiciona event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Função para instalar o PWA
  const installPWA = async (): Promise<boolean> => {
    if (!pwaState.installPrompt) {
      return false
    }

    try {
      await pwaState.installPrompt.prompt()
      const { outcome } = await pwaState.installPrompt.userChoice
      
      if (outcome === 'accepted') {
        setPwaState(prev => ({
          ...prev,
          isInstallable: false,
          installPrompt: null,
        }))
        return true
      }
      
      return false
    } catch (error) {
      console.error('Erro ao instalar PWA:', error)
      return false
    }
  }

  // Função para compartilhar (Web Share API)
  const shareContent = async (data: {
    title?: string
    text?: string
    url?: string
  }): Promise<boolean> => {
    if (!navigator.share) {
      // Fallback para navegadores que não suportam Web Share API
      if (navigator.clipboard && data.url) {
        try {
          await navigator.clipboard.writeText(data.url)
          return true
        } catch (error) {
          console.error('Erro ao copiar para clipboard:', error)
          return false
        }
      }
      return false
    }

    try {
      await navigator.share(data)
      return true
    } catch (error) {
      console.error('Erro ao compartilhar:', error)
      return false
    }
  }

  // Função para registrar notificação push
  const requestNotificationPermission = async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      return 'denied'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      return permission
    }

    return Notification.permission
  }

  // Função para mostrar notificação local
  const showNotification = (title: string, options?: NotificationOptions): boolean => {
    if (Notification.permission !== 'granted') {
      return false
    }

    try {
      new Notification(title, {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        ...options,
      })
      return true
    } catch (error) {
      console.error('Erro ao mostrar notificação:', error)
      return false
    }
  }

  return {
    ...pwaState,
    installPWA,
    shareContent,
    requestNotificationPermission,
    showNotification,
    canShare: !!navigator.share,
    canNotify: 'Notification' in window,
  }
}