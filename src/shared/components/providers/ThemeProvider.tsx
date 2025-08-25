'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
  isLight: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'styllo-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Detecta a preferência do sistema
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Aplica o tema no documento
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    
    // Remove classes de tema anteriores
    root.classList.remove('light', 'dark')
    
    // Adiciona a nova classe de tema
    root.classList.add(newTheme)
    
    setResolvedTheme(newTheme)
  }

  // Carrega o tema salvo no localStorage
  useEffect(() => {
    setMounted(true)
    
    const savedTheme = localStorage.getItem(storageKey) as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [storageKey])

  // Aplica o tema quando ele muda
  useEffect(() => {
    if (!mounted) return

    let effectiveTheme: 'light' | 'dark'
    
    if (theme === 'system') {
      effectiveTheme = getSystemTheme()
    } else {
      effectiveTheme = theme
    }
    
    applyTheme(effectiveTheme)
    localStorage.setItem(storageKey, theme)
  }, [theme, mounted, storageKey])

  // Escuta mudanças na preferência do sistema
  useEffect(() => {
    if (!mounted || theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme(getSystemTheme())
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, mounted])

  // Função para alternar entre claro e escuro
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  }

  // Evita hidratação mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  
  return context
}