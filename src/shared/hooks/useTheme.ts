import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

/**
 * Hook para gerenciar o tema da aplicação
 * Suporta tema claro, escuro e automático baseado na preferência do sistema
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Detecta a preferência do sistema
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Aplica o tema no documento
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    setResolvedTheme(newTheme)
  }

  // Carrega o tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('styllo-theme') as Theme
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  // Aplica o tema quando ele muda
  useEffect(() => {
    let effectiveTheme: 'light' | 'dark'
    
    if (theme === 'system') {
      effectiveTheme = getSystemTheme()
    } else {
      effectiveTheme = theme
    }
    
    applyTheme(effectiveTheme)
  }, [theme])

  // Escuta mudanças na preferência do sistema
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme(getSystemTheme())
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Função para alterar o tema
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('styllo-theme', newTheme)
  }

  // Função para alternar entre claro e escuro
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    changeTheme(newTheme)
  }

  return {
    theme,
    resolvedTheme,
    changeTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: theme === 'system',
  }
}