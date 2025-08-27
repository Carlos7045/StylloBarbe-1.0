'use client'

import { useState, useRef, useEffect } from 'react'
import { Moon, Sun, Monitor, ChevronDown } from 'lucide-react'
import { Button } from './Button'
import { useTheme } from '@/shared/components/providers/ThemeProvider'
import { cn } from '@/shared/utils/cn'

interface ThemeDropdownProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'outline'
  align?: 'left' | 'right'
}

export function ThemeDropdown({ 
  size = 'md', 
  variant = 'outline',
  align = 'right'
}: ThemeDropdownProps) {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const themes = [
    { value: 'light', label: 'Claro', icon: Sun },
    { value: 'dark', label: 'Escuro', icon: Moon },
    { value: 'system', label: 'Sistema', icon: Monitor },
  ] as const

  const currentTheme = themes.find(t => t.value === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant={variant}
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <CurrentIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{currentTheme.label}</span>
        <ChevronDown className={cn(
          'h-3 w-3 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </Button>

      {isOpen && (
        <div className={cn(
          'absolute top-full mt-2 w-40 bg-theme-secondary border border-theme-primary rounded-lg shadow-lg z-50',
          align === 'right' ? 'right-0' : 'left-0'
        )}>
          <div className="py-1">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isSelected = theme === themeOption.value
              
              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors',
                    'hover:bg-theme-hover',
                    isSelected 
                      ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' 
                      : 'text-theme-secondary'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{themeOption.label}</span>
                  {isSelected && (
                    <div className="ml-auto w-2 h-2 bg-amber-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}