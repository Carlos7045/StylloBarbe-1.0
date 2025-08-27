'use client'

import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from './Button'
import { useTheme } from '@/shared/components/providers/ThemeProvider'

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'outline'
  showLabel?: boolean
  showSystem?: boolean
}

export function ThemeToggle({ 
  size = 'md', 
  variant = 'ghost',
  showLabel = false,
  showSystem = false
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()

  if (showSystem) {
    // Versão com 3 opções: claro, escuro, sistema
    const getNextTheme = () => {
      switch (theme) {
        case 'light': return 'dark'
        case 'dark': return 'system'
        case 'system': return 'light'
        default: return 'light'
      }
    }

    const handleClick = () => {
      setTheme(getNextTheme())
    }

    const getIcon = () => {
      switch (theme) {
        case 'light':
          return <Sun className="h-4 w-4" />
        case 'dark':
          return <Moon className="h-4 w-4" />
        case 'system':
          return <Monitor className="h-4 w-4" />
        default:
          return <Sun className="h-4 w-4" />
      }
    }

    const getLabel = () => {
      switch (theme) {
        case 'light': return 'Claro'
        case 'dark': return 'Escuro'
        case 'system': return 'Sistema'
        default: return 'Claro'
      }
    }

    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        title={`Tema atual: ${getLabel()}. Clique para alternar.`}
      >
        {getIcon()}
        {showLabel && (
          <span className="ml-2">{getLabel()}</span>
        )}
      </Button>
    )
  }

  // Versão simples: apenas claro/escuro
  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="relative"
      title={`Alternar para tema ${resolvedTheme === 'light' ? 'escuro' : 'claro'}`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      {showLabel && (
        <span className="ml-2">
          {resolvedTheme === 'light' ? 'Escuro' : 'Claro'}
        </span>
      )}
    </Button>
  )
}